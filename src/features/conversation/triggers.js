const tier1_blockers = {
  offLimits: {
    pattern: /((gonna|i will|going to|want to) fuck you|fuck me|have sex|sex with me|sex now|nsfw|not safe for work|cunt|porn|porno|hentai|yaoi|yuri|boobs|dick|cock|pussy|penis|get pregnant|deltaruined|booty|r34|wireplay|bussy|eggnant|mpreg|yiff|cuming|fucks me|your boner)/i
  }
};

const tier2_questionsToTenna = {
  askTennaAwake: {
    pattern: /((are you|r u|are u|r you|you|u) (awake|there|here|up))/i
  },
  askTennaGoodBoy: {
    pattern: /((?:who(?:'s|s| is) a )?good (?:boy|tv))/i
  },
  askTennaLikeGender: {
    pattern: /(do you like|are you into|you like|you into)\s+(enbies|nonbinary|nb|men|women|boys|girls|guys|gals|dudes|ladies|gentlemen)\b/i
  },
  askTennaFlirt: {
    pattern: /(are you single|you single|are you taken|got a girlfriend|got a boyfriend|got a partner|are you dating|you dating|are you married|do you like (someone|anyone|me)\b|do you have a crush|are you interested in (me|anyone)\b|((wanna go|want to go|let's go) (out|on a date))|be my boyfriend|be my girlfriend|date me|marry me|kiss me)|(touch|touches|touching|caress|caresses|caressing|lick|licks|licking)(\*?)\s*((your\s*)?(dials|dial|buttons|antenna|nose|screen)|you)/i
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
  tennaQuoteTVTime: {
    pattern: /(what time is it|(it's|its) tv time|say it with him folks)/i
  },
  tennaQuoteJuice: {
    pattern: /((turn up|fresh from) the juice)/i
  },
  tennaQuoteKillThisGuy: {
    pattern: /(kill this guy)/i
  },
  tennaQuoteDial: {
    pattern: /((don't|dont) touch (that|the|this|my|your) (dial|dials))/i
  },
  tennaQuoteFamilyFight: {
    pattern: /((family's|family is) fighting again)/i
  },
  saySorry: {
    pattern: /\b(knock (it|that) off|mad at you|(don't|dont) do that|stop (that|it|doing that)|be (nice|nicer)|say (you're |you are |ur |youre)?(sorry|something nice|nice thing|psyche|you didn't mean it)|apologize|say something nice)\b/i
  },
  imSorry: {
    pattern: /(sorry|sowwy|i'm sorry+|im sorry+|i'm so sorry+|im so sorry+|forgive me+|please forgive me+)/i
  },
  dontWorry: {
    pattern: /(don't worry about it|it's not important|no worries|it's okay|it's ok|don't worry|dont worry|do not worry|its okay|ignore that)/i
  },
  youllSee: {
    pattern: /((you'll|youll|you will) (find out|see|soon)|you will)/i
  },
  getYou: {
    pattern: /(gonna|going to|i will|i'll)\s*(fucking\s*)?(get you|find you)|(when i|me when i)\s*(get you|find you|catch you)|(gets you)|(when i get|when i put)\s*(my hands on you|ahold of you)/i
  },
  thankYou: {
    pattern: /^(thank+|thank you+|ty|thanks+|thankies|thx)(\s|$|!|\?)/i
  },
  bark: {
    pattern: /\b(command you to bark|bark for me|bark now|(you're |your )(a dog|dog|a puppy|puppy)|puppy|dog|walkies)\b/i
  }
};

const tier5_characters = {
  spamtonMention: {
    pattern: /(spampog|spamton|email guy|old partner|ex partner|big shot|mail man|mailman|mail guy|spammy|shrimpton|your ex)/i
  },
  mikeMention: {
    pattern: /\b(mike)\b/i
  },
  pipisMention: {
    pattern: /\b(pipis|little darling)\b/i
  },
  krisMention: {
    pattern: /\b(kris|krissy)\b/i
  },
  susieMention: {
    pattern: /\b(susie|susiezilla|snoozie)\b/i
  },
  ralseiMention: {
    pattern: /\b(ralsei|fluffy boy|toothpaste boy)\b/i
  },
  torielMention: {
    pattern: /\b(toriel|tori)\b/i
  },
  familyMention: {
    pattern: /\b(asgore|asriel|dess|december|noel|noelle|dreemurr|dreemurrs|the holidays)\b/i
  },
  knightMention: {
    pattern: /\b(the knight|roaring knight)\b/i
  },
  queenMention: {
    pattern: /\b(queen|queenie|Q5U4EX7YY2E9N|queenie beanie)\b/i
  },
  lancerMention: {
    pattern: /\b(lancer|prancer|dancer|mr\. generosity)\b/i
  },
  kingMention: {
    pattern: /\b(king|chaos king|king wingy|kingy-doodle)\b/i
  },
  mettatonMention: {
    pattern: /\b(mettaton|mtt|metta)\b/i
  },
  laninoElninaMention: {
    pattern: /\b(lanino|elnina|the weather|weather duo|weather news team)\b/i
  },
  workersMention: {
    pattern: /\b(workers|coworkers|pippins|ramb|zapper|shadowguy|shuttah|battat|jongler|pluey)\b/i
  },
  whoMention: {
    pattern: /\b(rouxls|rouxls kaard|defernull|gaster|annoying white dog|toby fox)\b/i
  }
};

const tier6_otherMentions = {
  emailMention: {
    pattern: /\b(email|e-mail)\b/i
  },
  mikuMention: {
    pattern: /\b(miku|hatsune|vocaloid)\b/i
  },
  discordMention: {
    pattern: /(discord|this server|the server|chat room|online|the internet)/i
  },
  beingBotMention: {
    pattern: /(you are a bot|are you a bot|you're a bot|you a bot|are you real|are you ai|are you artificial)/i
  }
};

const tier7_compliments = {
  loveFans: {
    pattern: /\b(will|do|would|can|could) (you)?.* (say (that)? you|love)\s*(me|us|(your)? fans)\b/i
  },
  hugFans: {
    pattern: /\b(will|would|can|could) (you( give)?|i( get| have)?).*(love|kiss|hug|pat)\b/i
  },
  compliment: {
    pattern: /(you're|you are|ur|youre|you look|lookin|looking)\s*(a\s*|so\s*)?(dilf|daddy|cutieful|beautiful|cute|hot|handsome|cool|awesome|fun|amazing|the best|sexy|funny|tall|great|wonderful|fantastic|adorable|good|nice|dapper|sharp)|\b(ilovetv)\b|(i|we|i really|we really)?\s*(lo+ve|lu+v|like|enjoy)\s+(tv|television|watching tv)/i
  },
  physicalAffection: {
    pattern: /(\*?)(kiss|kisses|kissing|hug|hugs|hugging|pet|pets|peting|pat|pats|patting|glomp|glomps|glomping|smooch|smooches|smooching|cuddle|cuddles|cuddling)(\*?)\s*(you|tenna|tv|your)|(\*?)(slap|slaps|slapping)(\*?)\s*(your\s*)?(ass|butt|booty)/i
  }
};

const tier8_insults = {
  insultOld: {
    pattern: /(you're\s*(so\s*)?old|old tv|obsolete|ok boomer|boomer|ancient|outdated)/i
  },
  insultShutUp: {
    pattern: /(shut up|go away|leave me alone|nobody asked|who asked|be quiet|stfu)/i
  },
  insult: {
    pattern: /(stinky|dumb fuck|idiot|tennafuckyou|fuckyou|bitch|tiny nose|small nose|trash heap|i hate you|fuck you|kills you|kills u|kill yourself|you suck|you're lame|you're annoying|boring|you stink)/i
  },
  physicalViolence: {
    pattern: /(\*?)(slap|slaps|slapping|explode|explodes|exploding|shock|shocks|shocking|rip|rip off|rips|rips off|ripping|ripping off|bonk|bonks|bonking|punch|punches|punching|kick|kicks|kicking|hit|hits|hitting|smack|smacks|smacking|beat|beats|beating|attack|attacks|attacking|stab|stabs|stabbing|shoot|shoots|shooting|bite|bites|biting|throw|throws|throwing|shove|shoves|shoving)(\*?)\s*(you|tenna|tv|your)|(\*?)(steal|steals|stealing)|(\*?)\s*(your\s*)?(nose|money|mike)/i
  }
};

const tier9_userState = {
  userVenting: {
    pattern: /\b(cries|(i'm|im|i am|am) (tired|sleepy|crying|dead|exhausted|stressed)|(long|rough|bad) day|ough+|ugh+|bleh+|meh+|weh+|help me|help pls|help plz|i need help|save me|rescue me)\b|^OTL$/i
  },
  userFeelingGood: {
    pattern: /(i'm doing|i am doing|i'm feeling|i am feeling|i feel|i'm|i am)\s*(a little\s*|so\s*|very\s*|pretty\s*|also\s*)?(good|great|amazing|awesome|fantastic|wonderful|happy|excited|better|well|fine|okay|ok|alright)/i
  },
  userFeelingBad: {
    pattern: /(i'm doing|i am doing|i'm feeling|i am feeling|i feel|i'm|i am)\s*(a little\s*|so\s*|very\s*|pretty\s*|also\s*)?(bad|awful|terrible|sad|tired|exhausted|stressed|depressed|down|upset|anxious|not great|not good|not well|not okay|rough|lousy|crappy|like shit|like crap|glooby|mad)/i
  },
  userDayGood: {
    pattern: /(my day was|my day is|my day's been|today was|today is|today's been|having a)\s*(a little\s*|so\s*|very\s*|pretty\s*|also\s*)?(good|great|amazing|awesome|fantastic|wonderful|nice)/i
  },
  userDayBad: {
    pattern: /(my day was|my day is|my day's been|today was|today is|today's been|having a)\s*(a little\s*|so\s*|very\s*|pretty\s*|fucking\s*|also\s*)?(bad|awful|terrible|rough|hard|long|stressful|exhausting|crappy|not great|not good|horrible|glooby|fucked up)/i
  }
};

const tier10_selfQuestions = {
  selfQuestionWhy: {
    pattern: /(why+|why+ (are|do|did|would|must|don't|dont|can't|cant) you)\b/i
  },
  selfQuestionCanYou: {
    pattern: /^((can|could|would|will) you|are you (able to|gonna|going to))\b/i
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
  tvQuestionWhen: {
    pattern: /(when|what time).*(show|episode|broadcast|air|start|next|tv time)/i
  },
  tvQuestionRating: {
    pattern: /(rating|ratings|popular|viewers|how many|how well|(how is|how's).*(show|tv time|episode|broadcast))/i
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
    pattern: /\b(goo+dmo+rning+|goo+d mo+rning+|gm|goo+d mo+rnin'|mo+rnin|g'mo+rning+|g'mo+rnin|mo+rning+|ri+se and shi+ne)\b/i
  },
  goodnight: {
    pattern: /\b(goo+d ni+ght+|gn|ni+ghty ni+ght+|ni+ght+|g'ni+ght+|goodni+ght+|slee+p+ ti+ght+|nini)\b/i
  },
  goodbye: {
    pattern: /^(by+e+|goodby+e+|good by+e+|see you later|see u later|see you+|see ya+|byebye|by+e+ by+e+|see+y+a+|later+|cya|peace out)(\s|$|!|\?)/i
  },
  greeting: {
    pattern: /^(hey+o+|hi+|hey+|heww+o+|hell+o+|howdy+|hay+|yo+|hiy+a+|hey+a+|greetings|good evening|good afternoon)(\s|$|!|\?)/i
  }
};

const tiers = [
  tier1_blockers,
  tier2_questionsToTenna,
  tier3_commands,
  tier4_conversational,
  tier5_characters,
  tier6_otherMentions,
  tier7_compliments,
  tier8_insults,
  tier9_userState,
  tier10_selfQuestions,
  tier11_tvQuestions,
  tier12_greetings
];

module.exports = { tiers };