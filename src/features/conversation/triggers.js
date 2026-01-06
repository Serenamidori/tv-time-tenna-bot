const tier1_blockers = {
  offLimits: {
    pattern: /((gonna|i will|going to|want to|wanna) fuck you|fuck me|have sex|sex with me|sex now|nsfw|not safe for work|cunt|porn|porno|hentai|yaoi|yuri|boobs|tits|breasts|dick|cock|pussy|penis|get pregnant|deltaruined|r34|wireplay|bussy|eggnant|mpreg|yiff|cuming|cum|fucks me|(your|ur) (boner|balls|boob|tit))/i
  }
};

const tier2_questionsToTenna = {
  askTennaAwake: {
    pattern: /\b((are|r)?\s?(you+|u) (awake|there|here|online)|(are|r) (you+|u) up)\b/i
  },
  askTennaGoodBoy: {
    pattern: /((who(('|’)?s| is)? a )?good (boy|tv))/i
  },
  askTennaLikeGender: {
    pattern: /((do)?\s?(you+|u) like|(are|r)?\s?(you+|u) into) (enbies|nonbinary|nb|men|women|boys|girls|guys|gals|dudes|ladies|gentlemen)/i
  },
  askTennaFlirt: {
    pattern: /(are|r)?\s?(you+|u) (interested in (someone|anyone|anybody|me)|single|taken|in a relationship|seeing (someone|anyone|anybody)|dating|married)|(do (you+|u))?\s?(got|have) a (gf|bf|girlfriend|boyfriend|partner|husband|wife|spouse)|do (you+|u) (have a crush|like (someone|anyone|anybody|me))|((wanna go|want to go|let('|’)?s go) (out|on a date))|be my (boyfriend|girlfriend|wife|husband|spouse|partner)|(date|marry|kiss) me|(touch|touches|touching|caress|caresses|caressing|lick|licks|licking|grab|grabs|grabbing|grope|gropes|groping|squeeze|squeezes|squeezing)(\*?)\s*((your|ur\s*)?(dial|dial|button|antenna|nose|screen)|(you+|u))/i
  },
  askTennaLove: {
    pattern: /^(?!.*can\s*you)((do|don('|’)?t)?\s?(you+|u)\s?(really|rly)?)\s+(love|like|enjoy)\s+(tv|television|me|us|your (show|job|fans|audience))/i
  },
  askTennaAge: {
    pattern: /(how old ((are|r) (you+|u)|is tenna)|what age (are|r) (you+|u)|when were (you+|u) (made|born|created|built)|what year were (you+|u)|(what is|what('|’)?s)?\s?(your|ur) age|(((are|r) (you+|u))|is tenna) old)/i
  },
  askTennaRemember: {
    pattern: /((do|can|don('|’)?t)?\s?(you+|u)?\s?remember\s?(that time|when)?|did (you+|u) forget)/i
  },
  askTennaKnow: {
    pattern: /((what do|do|have|ever)?\s?(you+|u)?\s?(heard|hear|learned|learn|know) (about|of|what|who|anything))/i
  }
};

const tier3_commands = {
  quizCommand: {
    pattern: /(quiz (me|us|him|her|them|time)|(can i (get|have|try|do)\s?(a)?|(want|do|start|give\s?(me)?)\s?(a)?) quiz)/i
  },
  balanceCommand: {
    pattern: /((what\s?(is)?|what('|’)?s) (my|their) balance|(how many|check my|where are my) points|how (much|many) (do|does) (i|they|he|she) have|show (my)?\s?(balance|points)|(points|point) balance)/i
  },
  introduceCommand: {
    pattern: /(my (name|nickname|birthday|pronouns) (is|are)|introduce myself|(would (you+|u)|want to|wanna) (know|learn|hear) my (name|nickname|birthday|pronouns))/i
  },
  scheduleCommand: {
    pattern: /((create|make|start|set|plan|schedule) (the|a|an|my).*(event|meeting|party|sprint))/i
  }
};

const tier4_conversational = {
  tennaQuoteTVTime: {
    pattern: /(what time is it|(it('|’)?s) (tv|t! v!|tv!) time|say it with him folks)/i
  },
  tennaQuoteJuice: {
    pattern: /((turn up|fresh from) the juice)/i
  },
  tennaQuoteKillThisGuy: {
    pattern: /((how do (i|we|you+|u))?\s?kill (((this|that) guy)|tenna))/i
  },
  tennaQuoteDial: {
    pattern: /((don('|’)?t) touch (that|the|this) (dial|dials))/i
  },
  tennaQuoteFamilyFight: {
    pattern: /((family('|’)?s|family is) fighting again)/i
  },
  saySorry: {
    pattern: /\b((knock|quit|stop) (doing)?\s?(it|that)\s?(off)?|(i am|i('|’)?m|they('|’)?re|they are|she is|she('|’)?s|he is|he('|’)?s)?\s?mad at (you+|u)|don('|’)?t (do that|be (mean|rude|(a\s)?jerk))|be (nice|nicer|kind)|say (you('|’)?re|you are|ur|your)?\s?(sorry|something nice|a nice thing|psyche|(you+|u) (didn('|’)?t|don('|’)?t) mean (it|that))|apologize|apologise|say something (nice|nicer|kind|better))\b/i
  },
  imSorry: {
    pattern: /((i am|i('|’)?m|they('|’)?re|they are|she is|she('|’)?s|he is|he('|’)?s)?.*(sorr+y+|soww+y+)|forgi+ve+ (me+|u+s+|them+|her+|him+))/i
  },
  dontWorry: {
    pattern: /((don('|’)?t|do not) worry\s?(about it)?|(it('|’)?s|it is) (okay|ok|not important|alright|all (good|right|okay|ok))|no worries|(ignore|forget\s?(about)?) (that|me|us|them|him|her|it))/i
  },
  youllSee: {
    pattern: /((you('|’)?ll|you will) (find out|see+|soo+n+)|you+ w+ill+)/i
  },
  getYou: {
    pattern: /(gonna|going to|i will|i('|’)?ll|(me\s)?(when|once) i).*(((get|put)\s*(ahold of|a hold of|my hands on)?|find|catch) you)|(get|gets|getting) (you+|u)/i
  },
  thankYou: {
    pattern: /\b((big\s)?tha+nk+|tha+nk (you+|u+)|ty+|tha+nks+|tha+nkies|thx+)\b/i
  },
  bark: {
    pattern: /((command|demand) (that\s)?you (to\s)?bark|bark for (me|us)|bark (right\s)?now|(you('|’)?re|your|ur)\s*((a\s)?.*(dog|pup|puppy|doggy|doggo|buppy|pupper))|walkies)/i
  }
};

const tier5_characters = {
  spamtonMention: {
    pattern: /(spampog|spamton|email guy|(old|ex) partner|big shot|mail man|mailman|mail guy|spammy|shrimpton|your ex)/i
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
    pattern: /\b(king|chaos king|king wingy|kingy(-|\s)doodle)\b/i
  },
  mettatonMention: {
    pattern: /\b(mettaton|mtt|metta)\b/i
  },
  laninoElninaMention: {
    pattern: /\b(lanino|elnina|weather (news team|duo))\b/i
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
    pattern: /\b(discord|this server|the server|chat room|online|the internet)\b/i
  },
  beingBotMention: {
    pattern: /\b(((you+|u) (are|r)|(you+|u)|you('|’)?re|your|ur) (a\s)?((chat\s)?bot|ai|computer|real|fake|artificial))\b/i
  }
};

const tier7_compliments = {
  loveFans: {
    pattern: /\b(will|do|would|can|could) (you)?.* (say (that)? (you+|u)|love)\s*(me|us|(your|ur)? fans)\b/i
  },
  hugFans: {
    pattern: /\b(kiss|hug|pat).*(me+|them+|her|him|ple+a+s+e+|pls+|plz+|no+w|soO+n)\b|\b(will|would|can|could) (you( give)?|i( get| have)?).*(love|kiss|hug|pat)\b/i
  },
  compliment: {
    pattern: /(you('|’)?re|(you+|u)\s?(are|r)?|ur)\s*(look\s*|lookin\s*|looking\s*)?(a\s*|so\s*)?(dilf|daddy|cutieful|beautiful|cute|hot|handsome|cool|awesome|fun|amazing|the best|sexy|funny|tall|great|wonderful|fantastic|adorable|good|nice|dapper|sharp)|\b(ilovetv)\b|(i|we)?.*(lo+ve|lu+v|like|enjoy)\s+(((watching\s|watchin\s)?tv|television)|tenna|you)/i
  },
  physicalAffection: {
    pattern: /(\*?)(kiss|kisses|kissing|hug|hugs|hugging|pet|pets|peting|pat|pats|patting|glomp|glomps|glomping|smooch|smooches|smooching|cuddle|cuddles|cuddling)(\*?)\s*((you+|u)|tenna+|tv|your)|(\*?)(slap|slaps|slapping)(\*?)\s*((your|ur)\s*)?(ass+|butt+|booty+)/i
  }
};

const tier8_insults = {
  insultBoo: {
    pattern: /\b(boo+(\s(you|u|you('|’)?re|your|ur)?\s?(are|r)?\s?(su+ck+|sti+nk+|ba+d|bo+ri+ng+|stu+pi+d))?|(get\s)?off (the\s)?stage)\b/i
  },
  insultOld: {
    pattern: /((you('|’)?re|your|ur|(you+|u)\s?(are|r)?)\s*(a\s|an\s|so\s)?(old|obsolete|boomer|ancient|outdated)|old (man|tv|bitch|guy|dude|tenna)|(okay|ok|k) boomer)/i
  },
  insultShutUp: {
    pattern: /(shut (the\s(fuck|hell|shit|bitch)\s)?up|go away|leave (me|them|us|her|him) alone|(nobody|who) asked|be quiet|stfu|stop (talking|typing|yapping|bitching)|what (is bro|(are|r) (you+|u)) yapping about)/i
  },
  insult: {
    pattern: /(tennafuckyou|fuckyou|(tiny|small) nose|trash heap|i.*(hate|loathe|despise|detest) (you+|u)|(fuck|kills) (you+|u)|kill (yourself|urself)|(you+|u|you('|’)?re|your|ur) (suck|stink|fail|((are|r)?\s?(an|a|so|very|really|rly)?\s?(bad|mean|horrible|rude|stupid|stinky|whiney|idiot|dumb|bitch|meanie|failure)))|(you('|’)?re|ur|your) (lame|annoying|boring))/i
  },
  physicalViolence: {
    pattern: /(\*?)(slap|slaps|slapping|explode|explodes|exploding|shock|shocks|shocking|rip|rip off|rips|rips off|ripping|ripping off|bonk|bonks|bonking|punch|punches|punching|kick|kicks|kicking|hit|hits|hitting|smack|smacks|smacking|beat|beats|beating|attack|attacks|attacking|stab|stabs|stabbing|shoot|shoots|shooting|bite|bites|biting|throw|throws|throwing|shove|shoves|shoving)(\*?)\s*((you+|u)|tenna|tv|(your|ur))|(\*?)(steal|steals|stealing)|(\*?)\s*((your|ur)\s*)?(nose|credit|debit|money|mike)/i
  }
};

const tier9_userState = {
  userVenting: {
    pattern: /\b(spamtoncry|tennacry|catto_sad_cry|tennaglooby|tennadead|cri+es+|(i('|’)?m|(i\s)?am) (so|really|very)?\s?(tired|sleepy|crying|dead|exhausted|stressed|(really\s)?(going to|gonna) do it)|(long|rough|exhausting|dogshit|shitty|fucked) day|o+u+g+h+|u+g+h+|ble+h+|me+h+|we+h+)\b|^OTL$/i
  },
  userHelp: {
    pattern: /\b((he+lp+|rescue|sa+ve|protect)\s?(me|please|pls|plz|her|them|him)?|(i|they|she|he)?\s?(need|needs) help)\b|^OTL$/i
  },
  userFeelingGood: {
    pattern: /(i('|’)?m|i am|i)\s*(feeling|feelin|feel|doing|doin)?\s?((a\s)?(lil|bit|little)|so|very|really|pretty|also|all)?\s?(good|great|amazing|awesome|fantastic|wonderful|happy|excited|better|well|fine|okay|ok|alright)/i
  },
  userFeelingBad: {
    pattern: /(i('|’)?m|i am|i)\s*(feeling|feelin|feel|doing|doin)?\s?((a\s)?(lil|bit|little)|so|very|really|pretty|also)?\s?(bad|awful|terrible|sad|tired|exhausted|stressed|depressed|down|upset|anxious|rough|lousy|crappy|glooby|mad|not (feeling|feelin|feel|doing|doin)?\s?(great|good|well|okay|ok)|like (shit|crap))/i
  },
  userDayGood: {
    pattern: /((my|their|his|her)?\s?((day|today) (was|is|has been)|(day('|’)?s|today('|’)?s) been)|(having|havin) (a|an))\s*((a\s)?(lil|bit|little)|so|very|really|pretty)?\s?(fucking|fuckin)?\s?(?!not )(good|great|amazing|awesome|fantastic|wonderful|nice|fun|fine)/i
  },
  userDayBad: {
    pattern: /((my|their|his|her)?\s?((day|today) (was|is|has been)|(day('|’)?s|today('|’)?s) been)|(having|havin) (a|an))\s*((a\s)?(lil|bit|little)|so|very|really|pretty)?\s?(fucking|fuckin)?\s?(bad|awful|terrible|rough|hard|long|stressful|exhausting|crappy|not great|not good|horrible|glooby|fucked up)/i
  }
};

const tier10_selfQuestions = {
  selfQuestionWhy: {
    pattern: /(why+|why+ ((are|r)|do|did|would|must|don('|’)?t|can('|’)?t) (you+|u))\b/i
  },
  selfQuestionCanYou: {
    pattern: /^((can|could|would|will) (you+|u)|(are|r) (you+|u) (able to|gonna|going to))\b/i
  },
  selfQuestionWho: {
    pattern: /((who.*(are|r)|who('|’)?re) (you+|u)|(who.* is|who('|’)?s) (tenna+|this))/i
  },
  selfQuestionHow: {
    pattern: /(how ((are|r) (you+|ya+|u)|do you feel(?! about)|(you+|u) (doing|doin)|about (you+|u)|art thou|do (you+|u) do)|how('|’)?re (you+|u)|(how('|’)?s|how( is)?) (it (going+|hanging+|hangin))|hru|(are|r) (you+|u) (doing )?(ok|okay|alright|good|well|fine|groovy|awesome|great)|(has|was|is) your day)/i
  },
  selfQuestionWhatsUp: {
    pattern: /((what( is)?|what('|’)?s) (up|going (on|down)|happenin+|new)|wa+s+u+p|wa+z+u+p|(watcha|whatcha|(what (are|r)|what('|’)?re) (you+|u)) (up to|doin+)|su+p)/i
  },
  selfQuestionWhat: {
    pattern: /(what ((the|da) (hell|fuck|shit)|even)?\s?)((are|r) (you+|u)|is (a)?\s?tenna|do you.*do)/i
  },
  selfQuestionLike: {
    pattern: /(do (you+|u)|don('|’)?t (you+|u))\s+(love|like|enjoy|hate|prefer|want)\b/i
  },
  selfQuestionOpinion: {
    pattern: /((how|what) (do|would) (you+|u) (think|feel|respond|react|say)|(what('|’)?s|what is) (your|ur) opinion|(thoughts|(your|ur) take|opinion) on)/i
  },
  selfQuestionWhere: {
    pattern: /((where( are| r)?|where('|’)?re) (you+|u)| where ((are|r) ((you+|u) (living|staying)))|(do ((you+|u) (live|come from|stay)))|is tenna)/i
  }
};

const tier11_tvQuestions = {
  tvQuestionWhen: {
    pattern: /(when|what time).*(show|episode|broadcast|air|start|next|tv time)/i
  },
  tvQuestionRating: {
    pattern: /(rating|ratings|popular|viewers|how many|how well|(how is|how('|’)?s).*(show|tv time|episode|broadcast))/i
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
    pattern: /\b(goo+dmo+rning+|goo+d mo+rning+|gm|goo+d mo+rnin('|’)?|mo+rnin|g('|’)mo+rnin(g+)?|mo+rning+|ri+se and shi+ne)\b/i
  },
  goodnight: {
    pattern: /\b(goo+d ni+ght+|gn|ni+ghty ni+ght+|ni+ght+|g('|’)ni+ght+|goodni+ght+|slee+p+ ti+ght+|nini)\b/i
  },
  goodbye: {
    pattern: /(by+e+|goodby+e+|good by+e+|see (ya+|you+|u)( later)?|byebye|by+e+ by+e+|see+y+a+|later+|cya|peace out)/i
  },
  greeting: {
    pattern: /(hey+o+|hi+|hey+|heww+o+|hell+o+|howdy+|hay+|yo+|hiy+a+|hey+a+|greetings|good evening|good afternoon)/i
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