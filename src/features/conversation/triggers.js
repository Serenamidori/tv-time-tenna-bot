const tier1_blockers = {
  offLimits: {
    pattern: /\b(fuck me|have sex|sex with me|nsfw|not safe for work|cunt|porn|porno|hentai|yaoi|yuri|boobs|dick|cock|pussy|penis|get pregnant|deltaruined|booty|r34|wireplay|bussy|eggnant)\b/i
  }
};

const tier2_questionsToTenna = {
  askTennaFlirt: {
    pattern: /(are you single|you single|are you taken|got a girlfriend|got a boyfriend|got a partner|are you dating|you dating|are you married|do you like (someone|anyone|me)|do you have a crush|are you interested in (me|anyone)|wanna go out|want to go out|be my boyfriend|be my girlfriend|date me|marry me|kiss me)/i
  },
  askTennaLove: {
    pattern: /(do you|don't you|dont you|you really|do u)\s+(love|like|enjoy|hate|watch)\s+(tv|television|me|us|your (show|job|fans|audience))/i
  },
  askTennaAge: {
    pattern: /(how old are you|how old is tenna|what age are you|when were you (made|born|created|built)|what year were you|whats your age|what's your age|your age)/i
  },
  askTennaRemember: {
    pattern: /(do you remember|you remember|remember when|remember that time|can you remember|don't you remember|dont you remember|did you forget)/i
  },
  askTennaKnow: {
    pattern: /(do you know (about|of|what|who|anything)|what do you know (about|of)|you know (about|anything about|of)|have you heard (about|of)|ever heard (about| of))/i
  }
};

const tier3_commands = {
  quizCommand: {
    pattern: /(give me a quiz|quiz me|can i get a quiz|can i have a quiz|want a quiz|do a quiz|start a quiz|quiz time)/i
  },
  balanceCommand: {
    pattern: /(what is my balance|what's my balance|how many points|check my points|how much do i have|where are my points|show balance|show my balance|points balance|point balance)/i
  },
  introduceCommand: {
    pattern: /(my name is|my birthday is|my pronouns are|introduce myself|my nickname is)/i
  },
  scheduleCommand: {
    pattern: /(create an event|make an event|plan an event|schedule a)/i
  }
};

const tier4_conversational = {
  imSorry: {
    pattern: /(sowwy|i'm sorry+|im sorry+|i'm so sorry+|im so sorry+|forgive me+|please forgive me+)/i
  },
  dontWorry: {
    pattern: /(don't worry about it|it's not important|no worries|it's okay|it's ok|don't worry|dont worry|do not worry|its okay|ignore that)/i
  },
  youllSee: {
    pattern: /(you'll see|you'll find out|you will|you will soon)/i
  },
  thankYou: {
    pattern: /^(thank+|thank you+|ty|thanks+|thankies|thx)(\s|$|!|\?)/i
  }
};

const tier5_characters = {
  spamtonMention: {
    pattern: /(spamton|email guy|old partner|ex partner|big shot|mail man|mailman|mail guy|spammy|shrimpton)/i
  },
  mikeMention: {
    pattern: /\b(mike)\b/i
  },
  pipisMention: {
    pattern: /(pipis|little darling)/i
  },
  krisMention: {
    pattern: /\b(kris|krissy)\b/i
  },
  susieMention: {
    pattern: /(susie|susiezilla|snoozie)/i
  },
  ralseiMention: {
    pattern: /(ralsei|fluffy boy|toothpaste boy)/i
  },
  torielMention: {
    pattern: /\b(toriel|tori)\b/i
  },
  familyMention: {
    pattern: /(asgore|asriel|dess|december|noel|noelle|dreemurr|dreemurrs|the holidays)/i
  },
  knightMention: {
    pattern: /(the knight|roaring knight)/i
  },
  queenMention: {
    pattern: /(queen|queenie|Q5U4EX7YY2E9N|queenie beanie)/i
  },
  lancerMention: {
    pattern: /(lancer|prancer|dancer|mr\. generosity|chaos king|king wingy)/i
  },
  mettatonMention: {
    pattern: /(mettaton|mtt|metta)/i
  },
  laninoElninaMention: {
    pattern: /(lanino|elnina|the weather|weather duo|weather news team)/i
  },
  workersMention: {
    pattern: /(pippins|ramb|zapper|shadowguy|shuttah)/i
  },
  whoMention: {
    pattern: /(rouxls|battat|jongler|pluey|defernull|gaster)/i
  }
};

const tier6_otherMentions = {
  emailMention: {
    pattern: /\b(email|e-mail)\b/i
  },
  mikuMention: {
    pattern: /(miku|hatsune|vocaloid)/i
  },
  discordMention: {
    pattern: /(discord|this server|the server|chat room|online|the internet)/i
  },
  beingBotMention: {
    pattern: /(are you a bot|you're a bot|you a bot|are you real|are you ai|are you artificial)/i
  }
};

const tier7_insults = {
  insultOld: {
    pattern: /(you're\s*(so\s*)?old|old tv|obsolete|ok boomer|boomer|ancient|outdated)/i
  },
  insultShutUp: {
    pattern: /(shut up|go away|leave me alone|nobody asked|who asked|be quiet|stfu)/i
  },
  insult: {
    pattern: /(tiny nose|small nose|trash heap|i hate you|fuck you|kill yourself|you're a bitch|you suck|you're lame|you're annoying|boring|you stink)/i
  }
};

const tier8_compliments = {
  loveFans: {
    pattern: /\b(do|would|can|could)\s*(?:you)?\s*(love|kiss|hug|pat|say\s*(?:that\s*)?you\s*love)\s*(me|us|your\s*fans)\b/i
  },
  compliment: {
    pattern: /(you're|you are|ur|youre|you look|lookin|looking)\s*(so\s*)?(dilf|daddy|cutieful|beautiful|cute|hot|handsome|cool|awesome|fun|amazing|the best|sexy|funny|tall|great|wonderful|fantastic|adorable|good|nice|dapper|sharp)/i
  },
  physicalAffection: {
    pattern: /(\*?)(kiss|kisses|kissing|hug|hugs|hugging|pat|pats|patting|slap|slaps|slapping|glomp|glomps|glomping|smooch|smooches|smooching|cuddle|cuddles|cuddling)(\*?)\s*(you|tenna|tv|your)/i
  }
};

const tier9_userState = {
  userFeelingGood: {
    pattern: /(i'm doing|i am doing|i'm feeling|i am feeling|i feel|i'm)\s*(a little\s*|so\s*|pretty\s*|also\s*)?(good|great|amazing|awesome|fantastic|wonderful|happy|excited|better|well|fine|okay|ok|alright)/i
  },
  userFeelingBad: {
    pattern: /(i'm doing|i am doing|i'm feeling|i am feeling|i feel|i'm)\s*(a little\s*|so\s*|pretty\s*|also\s*)?(bad|awful|terrible|sad|tired|exhausted|stressed|depressed|down|upset|anxious|not great|not good|not well|not okay|rough|lousy|crappy|like shit|like crap|glooby)/i
  },
  userDayGood: {
    pattern: /(my day was|my day is|my day's been|today was|today is|today's been|having a)\s*(a little\s*|so\s*|pretty\s*|also\s*)?(good|great|amazing|awesome|fantastic|wonderful|nice)/i
  },
  userDayBad: {
    pattern: /(my day was|my day is|my day's been|today was|today is|today's been|having a)\s*(a little\s*|so\s*|pretty\s*|fucking\s*|also\s*)?(bad|awful|terrible|rough|hard|long|stressful|exhausting|crappy|not great|not good|horrible|glooby|fucked up)/i
  },
  userVenting: {
    pattern: /\b(i'm glooby|i'm tired|i'm sleepy|long day|rough day|bad day|ugh+|bleh|meh|exhausted|stressed out|weh|help me|help pls|help plz|i need help)\b|^OTL$/i
  }
};

const tier10_selfQuestions = {
  selfQuestionWhy: {
    pattern: /(why are you|why do you|why must you|why would you|why did you|why don't you|why cant you|why can't you)\b/i
  },
  selfQuestionCanYou: {
    pattern: /^(can you|could you|would you|will you|are you able to|are you gonna|are you going to)\b/i
  },
  selfQuestionWho: {
    pattern: /(who are you|who is tenna|who's tenna|who is this)/i
  },
  selfQuestionHow: {
    pattern: /(how are you|how do you feel|how you doing|how're you|how's it going|how's it hanging|how's it hangin|how about you|what about you|how has your day|how art thou|how do you do|how are ya|how r u|how u doing|hru|are you (ok|okay|alright|good|well|fine)|you (ok|okay|alright|good)\?)/i
  },
  selfQuestionWhatsUp: {
    pattern: /(what up|what's up|what is up|wassup|wazzup|what's going on|what is going on|whatcha up to|what are you up to|what you up to|sup)/i
  },
  selfQuestionWhat: {
    pattern: /(what are you|what is tenna|what do you do)/i
  },
  selfQuestionLike: {
    pattern: /(do you|don't you|do u|dont u)\s+(love|like|enjoy|hate|prefer|want)\b/i
  },
  selfQuestionOpinion: {
    pattern: /(what do you think|what's your opinion|what do you feel|how do you feel about|thoughts on|your take on|opinion on|how do you respond|how do you react|how would you respond|how would you react|what do you say to|how do you feel when|what do you think about|what do you think of)/i
  },
  selfQuestionWhere: {
    pattern: /(where are you|where do you live|where you at|where u at|where do you come from|where are you from|where you from|where is tenna|where do you stay)/i
  }
};

const tier11_tvQuestions = {
  tvQuestionTVTime: {
    pattern: /(what).*(time is it|tv time)/i
  },
  tvQuestionWhen: {
    pattern: /(when|what time).*(show|episode|broadcast|air|start|next|tv time)/i
  },
  tvQuestionRating: {
    pattern: /(rating|ratings|popular|viewers|how many|how well)/i
  },
  tvQuestionWhat: {
    pattern: /(what|which).*(show|episode|channel|program|watch|on tv|tv time)/i
  },
  tvQuestionHow: {
    pattern: /(how).*(watch|tune in|see|find|tv time)/i
  }
};

const tier12_greetings = {
  goodMorning: {
    pattern: /\b(goodmorning|good morning+|gm|good mornin'|mornin')\b/i
  },
  goodnight: {
    pattern: /\b(good night+|gn|nighty night|night night|g'night|goodnight)\b/i
  },
  goodbye: {
    pattern: /^(bye+|goodbye|good bye|see you later|see u later|see you|see ya+|byebye|bye bye|seeya+|later|cya|peace out)(\s|$|!|\?)/i
  },
  greeting: {
    pattern: /^(heyo|hi+|hey+|hewwo+|hello+|howdy|hay|yo+|hiya+|heya+|greetings|good evening|good afternoon)(\s|$|!|\?)/i
  }
};

const tiers = [
  tier1_blockers,
  tier2_questionsToTenna,
  tier3_commands,
  tier4_conversational,
  tier5_characters,
  tier6_otherMentions,
  tier7_insults,
  tier8_compliments,
  tier9_userState,
  tier10_selfQuestions,
  tier11_tvQuestions,
  tier12_greetings
];

module.exports = { tiers };