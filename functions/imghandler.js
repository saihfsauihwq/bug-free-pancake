const { Configuration, OpenAIApi } = require("openai-node");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const filepath = path.join(__dirname, "..", "api_key.json");
const apikey = JSON.parse(fs.readFileSync(filepath, "utf8"));
const configuration = new Configuration({
  apiKey: apikey.openai,
});
const openai = new OpenAIApi(configuration);

module.exports = async (api, event) => {
  try {
    const response = await openai.createImage({
      prompt: event.body,
      n: 1,
      size: "1024x1024",
    });
    api.sendMessage("Processing image...", event.threadID, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    const imageDataUrl = response.data.data[0].url;
    const { data: imageData } = await axios.get(imageDataUrl, {
      responseType: "arraybuffer",
    });

    const uuid = require("uuid").v4();
    const path = `image/${uuid}.png`;

    return new Promise((resolve, reject) => {
      fs.writeFile(path, imageData, "binary", (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    })
      .then(() => {
        api.getThreadInfo(event.threadID, async (err, info) => {
          if (err) {
            console.error(err);
            return;
          }

          const sender = info.userInfo.find((p) => p.id === event.senderID);
          const senderName = sender.firstName;

          const image = fs.createReadStream(path);

          const img = {
            body: `Here's the image ${senderName}`,
            attachment: image,
          };

          api.sendMessage(img, event.threadID, (err) => {
            if (err) {
              console.error(err);
              api.sendMessage("Error Processing Image.", event.threadID);
            }
          });
        });
      })
      .catch((err) => {
        console.error(err);
        api.sendMessage("Error Processing Image.", event.threadID);
      })
      .finally(() => {
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 400) {
      api.sendMessage(
        "Please send an appropriate request of an image you want to generate...",
        event.threadID
      );
    }
  }
};