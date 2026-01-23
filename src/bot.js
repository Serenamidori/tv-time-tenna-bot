require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, MessageFlags } = require("discord.js");
const { handleDialogue } = require('./features/conversation/handler');
const { mikeService, ScheduledTasks } = require("./utils");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.commands = new Collection();

const loadCommands = () => {
  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      delete require.cache[require.resolve(filePath)];
      const command = require(filePath);

      if ("data" in command && "execute" in command) {
        bot.commands.set(command.data.name, command);
      } else {
        console.warn(`Command ${filePath} is missing a "data" or "execute"`);
      }
    }
  }
};

loadCommands();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to database'))
.then(() => ScheduledTasks.runDailyTasks(bot))
.catch(err => console.error('MongoDB connection error:', err));

bot.on("ready", () => {
  console.info(`🔓 Logged in as ${bot.user.tag}`);
  console.info(`✅ Loaded ${bot.commands.size} commands`);
});

bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const allowedChannels = [
    process.env.GENERAL_CHAT,
    process.env.STAGE_CHAT,
    process.env.LOUNGE_VOICE_CHAT
  ];

  if (!allowedChannels.includes(interaction.channelId)) {
    const mike = mikeService.getMikeMessage("error", `Hey! Stop that!!`, `Tenna ain't allowed in this channel! Don't go calling for him in here!`);
    await interaction.reply({
      embeds: mike.embeds,
      files: mike.files,
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  const commandName = interaction.commandName;
  const command = bot.commands.get(commandName);

  if (!command) {
    console.error(`No command matching '${commandName}' was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing '${commandName}' by ${interaction.user.tag}:`, error);

    const mike = mikeService.getMikeMessage("error", `Whoops!`, `Looks like "${commandName}" got its wires crossed!! Looks like we got the ol' "${error}" error. Why don'tcha try again?`);
    const errorContent = {
      embeds: mike.embeds,
      files: mike.files,
      flags: MessageFlags.Ephemeral
    };

    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorContent);
      } else {
        await interaction.reply(errorContent);
      }
    } catch (followUpError) {
      console.error("Failed to send error message to user:", followUpError.message);
    }
  }
});

bot.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  await handleDialogue(message, bot);
});

bot.on("error", (error) => {
  console.error("[discord.js error]", error);
});

bot.on("warn", (warning) => {
  console.warn("[discord.js warning]", warning);
});

const startBot = async () => {
  try {
    if (!process.env.TOKEN) {
      console.error("ERROR: Missing TOKEN");
      process.exit(1);
    }
    
    console.info("🔐 Logging in...");
    await bot.login(process.env.TOKEN);
    
  } catch (error) {
    console.error("Log in failed", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  console.log("\nShutting down Tenna Bot...");
  bot.destroy();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nReceived SIGTERM, shutting down Tenna Bot...");
  bot.destroy();
  process.exit(0);
});

startBot();
