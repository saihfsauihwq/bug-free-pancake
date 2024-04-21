const keep_alive = require("./keep_alive.js")
const fs = require("fs");
const login = require("fb-chat-api");

const loginCred = {
  appState: JSON.parse(fs.readFileSync("session.json", "utf-8")),
};

let running = false;
let stopListener = null;

function startListener(api, event) {
  try {
    if (running) {
      api.sendMessage(`Already running!`, event.threadID);
      return;
    }

    running = true;
const randMes = [
  "Hi there! How can I assist you today?",
  "Hey, I'm your friendly chatbot! What can I help you with?",
  "What is your will?",
  "You're Finally awake",
  "Welcome! I'm here to answer any questions you might have. What would you like to know?",
  "Ho Ho Ho, You Found me",
  "Be quick. Time is of the essence. And be careful. The blade is cursed.",
  "What is your will?",
  "How can I be of service?",
  "Greetings! How may I be of assistance today?",
  "Hello! What brings you here today?",
  "Greetings, traveler! How can I aid you on your journey?",
  "Hey there! I'm here to help. What's on your mind?",
  "Hello! I'm at your service. What can I do for you?",
  "Good day! How can I assist you?",
  "Hey! What can I assist you with today?",
  "Greetings! I'm here to assist you. What do you need?",
  "Hello, friend! How can I be of help today?",
  "Hi! How can I make your day better?",
  "Hey, it's you again! Ready for some more assistance?",
  "Greetings! How can I be of service today?",
  "Hello! I'm here to help. What can I do for you?",
  "Good day! How can I assist you?",
  "Hey! What can I assist you with today?",
  "Greetings! I'm here to assist you. What do you need?",
  "Hello, friend! How can I be of help today?",
  "Hi! How can I make your day better?",
  "Hey, it's you again! Ready for some more assistance?",
  "Hello! How may I assist you today?",
  "Hey there! I'm here to help. What's on your mind?",
  "Hello! I'm at your service. What can I do for you?",
  "What can I do for you today?",
  "How can I assist you right now?",
  "Hi there! What brings you here today?",
  "Hey, how can I assist you today?",
  "How can I make your day better?",
  "Greetings, user! How may I assist you?",
  "Hello! I'm here to help. What can I do for you?",
  "Good day! How can I assist you?",
  "Hey! What can I assist you with today?",
  "Greetings! I'm here to assist you. What do you need?",
  "Hello, friend! How can I be of help today?",
  "Hi! How can I make your day better?",
  "Hey, it's you again! Ready for some more assistance?",
  "What can I do for you today?",
  "How can I assist you right now?",
  "Hi there! What brings you here today?",
  "Hey, how can I assist you today?",
  "How can I make your day better?",
  "Greetings, user! How may I assist you?",
  "Hello! I'm here to help. What can I do for you?",
  "Good day! How can I assist you?",
  "Hey! What can I assist you with today?",
  "Greetings! I'm here to assist you. What do you need?",
  "Hello, friend! How can I be of help today?",
  "Hi! How can I make your day better?",
  "Hey, it's you again! Ready for some more assistance?",
  "What can I do for you today?",
  "How can I assist you right now?",
  "Hi there! What brings you here today?",
  "Hey, how can I assist you today?",
  "How can I make your day better?",
  "Greetings, user! How may I assist you?",
  "Hello! I'm here to help. What can I do for you?",
  "Good day! How can I assist you?",
  "Hey! What can I assist you with today?",
  "Greetings! I'm here to assist you. What do you need?",
  "Hello, friend! How can I be of help today?",
  "Hi! How can I make your day better?",
  "Hey, it's you again! Ready for some more assistance?",
  "What can I do for you today?",
  "How can I assist you right now?",
  "Hi there! What brings you here today?",
  "Hey, how can I assist you today?",
  "How can I make your day better?",
  "Greetings, user! How may I assist you?",
  "Hello! I'm here to help. What can I do for you?",
  "Good day! How can I assist you?",
  "Hey! What can I assist you with today?",
  "Greetings! I'm here to assist you. What do you need?",
  "Hello, friend! How can I be of help today?",
  "Hi! How can I make your day better?",
  "Hey, it's you again! Ready for some more assistance?",
];
    const randomIndex = Math.floor(Math.random() * randMes.length);
    const randomMessage = randMes[randomIndex];
    api
      .sendMessage(randomMessage, event.threadID)
      .catch((err) => console.error(err));

    stopListener = api.listenMqtt((err, event) => {
      if (!running) {
        return;
      }

      if (err) {
        console.log("listenMqtt error", err);
        start();
        return;
      }

      api.markAsRead(event.threadID, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      api.sendTypingIndicator(event.threadID, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });

      if (event.type === "message") {
        try {
          if (event.body.includes("/forecast")) {
            event.body = event.body.replace("/forecast", "");
            require("./functions/forecast.js")(api, event);
          }
          if (event.body.includes("$weather")) {
            event.body = event.body.replace("$weather", "");
            require("./functions/weather.js")(api, event);
          }
          if (event.body === "$help") {
            api.sendMessage(
              "  Sure, here are some commands you can use with me \n- `$start`: starts the chatbot initializes the conversation. \n - `$help`: displays the list of available commands. \n - `$about`: displays information about the chatbot. \n - `$weather [city]`: displays the weather information for the specified city. \n- `$$ [question]`: ask the chatbot a question",
              event.threadID
            );
          }
          if (event.body === "pa", "pap") {
            api.sendMessage(
              "Papap dol",
              event.threadID
            );
          }
          if (event.body.includes("$img")) {
            event.body = event.body.replace("$img", "");
            require("./functions/imghandler")(api, event);
          } else if (event.body.includes("$$")) {
            event.body = event.body.replace("$$", "");
            if (
              event.body.includes("haha") ||
              event.body.includes("yawa") ||
              event.body.includes("tanga") ||
              event.body.includes("gago")
            ) {
              api.setMessageReaction(":laughing:", event.messageID, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });
            } else if (event.body.includes("ayie")) {
              api.setMessageReaction(":love:", event.messageID, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });
            }

            require("./functions/handler.js")(api, event, (err, data) => {
              console.log(err);
              console.log(data);
              if (err) {
                api.sendMessage(`Error: ${err}`, event.threadID);
                return;
              }
            });
          }
        } catch (error) {
          console.log(error);
          api.sendMessage("An error has been occured.", event.threadID);
        }
      }
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("Error: " + error.message, event.threadID);
  }
}

function stopListenerFunc(api, event) {
  if (!running) {
    api.sendMessage(`Not running!`, event ? event.threadID : null);
    return;
  }
  running = false;
  api.sendMessage(`Stopping in 3 seconds...`, event.threadID);
  let count = 3;
  const countdown = setInterval(() => {
    api.sendMessage(`${count}`, event.threadID);
    count--;
    if (count === -1) {
      clearInterval(countdown);
      stopListener();
    }
  }, 1000);
}
function start() {
  login(loginCred, (err, api) => {
    if (err) {
      console.error("login cred error", err);
      return;
    }

    api.listen((err, event) => {
      try {
        if (err) {
          console.error("listen error:", err);
          start();
          return;
        }
      } catch (err) {
        console.err(err);
      }

      const actions = {
        "$start": startListener,
        "$pause": () => {
          running = false;
          api.sendMessage(`Paused.`, event.threadID);
        },
        "$continue": () => {
          running = true;
          api.sendMessage(`Continuing...`, event.threadID);
        },
        "$stop": stopListenerFunc,
      };

      const action = actions[event.body];
      if (action) {
        action(api, event);
      }
    });
  });
}
start();
module.exports = { stopListener };
