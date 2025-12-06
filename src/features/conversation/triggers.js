const offLimits = [
  'fuck me', 'have sex', 'sex with me',
  'nsfw', 'not safe for work', 'cunt',
  'porn', 'porno','hentai', 'yaoi', 'yuri',
  'boobs', 'dick', 'cock', 'pussy', 'penis',
  'get pregnant', 'deltaruined', 'booty',
  'r34', 'wireplay', 'bussy', 'eggnant'
];

const quizCommand = /(give me a quiz|quiz me|can i get a quiz|can i have a quiz|want a quiz|do a quiz|start a quiz|quiz time)/i;
const balanceCommand = /(what is my balance|what's my balance|how many points|check my points|how much do i have|where are my points|show balance|show my balance|points balance|point balance)/i;
const introduceCommand = /(my name is|my birthday is|my pronouns are|introduce myself|my nickname is)/i;
const scheduleCommand = /(create an event|make an event|plan an event|schedule a)/i;

const greeting = /^(heyo|hi+|hey+|hewwo+|hello+|howdy|hay|yo+|sup|hiya+|heya+|greetings|good evening|good afternoon)(\s|$|!|\?)/i;
const goodbye = /^(bye+|goodbye|good bye|see you later|see u later|see you|see ya+|byebye|bye bye|seeya+)(\s|$|!|\?)/i;
const goodMorning = /^(good morning+|gm|good mornin'|mornin')(\s|$|!|\?)/i;
const goodnight = /^(good night+|gn|nighty night)(\s|$|!|\?)/i;

const thankYou = /^(thank+|thank you+|ty|thanks+|thankies)(\s|$|!|\?)/i;
const compliment = /(you're|you are\s*(so\s*)?(dilf|daddy|cutieful|beautiful|cute|hot|handsome|cool|awesome|fun|amazing|the best|sexy|funny|tall)|(kiss|kisses|kissing|hug|hugs|hugging|pat|pats|patting|love|slap|slaps|slapping|glomp|glomps|glomping|smooch|smooches|smooching)\s*(you|tv|television|your show|tv time|your nose|your head|your face|your ass|your antennas|your antenna)|(big|huge)\s*fan|like you)/i;
const loveFans = /\b(do|would|can|could)\s*(?:you)?\s*(love|kiss|hug|pat|say\s*(?:that\s*)?you\s*love)\s*(me|us|your\s*fans)\b/i;

const userFeelingGood = /(i'm doing|i am doing|i'm feeling|i am feeling|i feel|i'm)\s*(a little\s*|so\s*|pretty\s*|also\s*)?(good|great|amazing|awesome|fantastic|wonderful|happy|excited|better|well|fine|okay|ok|alright)/i;
const userFeelingBad = /(i'm doing|i am doing|i'm feeling|i am feeling|i feel|i'm)\s*(a little\s*|so\s*|pretty\s*|also\s*)?(bad|awful|terrible|sad|tired|exhausted|stressed|depressed|down|upset|anxious|not great|not good|not well|not okay|rough|lousy|crappy|like shit|like crap|glooby)/i;
const userDayGood = /(my day was|my day is|my day's been|today was|today is|today's been|having a)\s*(a little\s*|so\s*|pretty\s*|also\s*)?(good|great|amazing|awesome|fantastic|wonderful|nice)/i;
const userDayBad = /(my day was|my day is|my day's been|today was|today is|today's been|having a)\s*(a little\s*|so\s*|pretty\s*|fucking\s*|also\s*)?(bad|awful|terrible|rough|hard|long|stressful|exhausting|crappy|not great|not good|horrible|glooby|fucked up)/i;
const userVenting = /(i'm glooby|i'm tired|i'm sleepy|long day|rough day|bad day|ough|ugh|bleh|meh|exhausted|stressed out|weh|OTL)/i;

const tvQuestionWhen = /(when|what time).*(show|episode|broadcast|air|start|next|tv time)/i;
const tvQuestionRating = /(rating|ratings|popular|viewers|how many|how well)/i;
const tvQuestionWhat = /(what|which).*(show|episode|channel|program|watch|on tv|tv time)/i;
const tvQuestionTVTime = /(what).*(time|tv time|time is it)/i;
const tvQuestionHow = /(how).*(watch|tune in|see|find|tv time)/i;

const selfQuestionWho = /(who are you|who is tenna|who's tenna)/i;
const selfQuestionHow = /(how are you|how do you feel|how you doing|how're you|how's it going|how's it hanging|how's it hangin|how about you|what about you|how has your day)/i;
const selfQuestionWhatsUp = /(what up|what's up|what is up|wassup|what's going on|what is going on|whatcha up to|what are you up to|what you up to)/i;
const selfQuestionWhat = /(what are you|what is tenna|what do you do)/i;
const selfQuestionLike = /(do you like|do you enjoy|do you love|you a fan of|are you into)/i;
const selfQuestionOpinion = /(what do you think|what's your opinion|what do you feel|how do you feel about|thoughts on|your take on|opinion on)/i;

const pipisMention = /(pipis|little darling)/i;
const emailMention = /(email|e-mail|mail)/i;
const krisMention = /(kris|krissy)/i;
const susieMention = /(susie|susiezilla|snoozie)/i;
const ralseiMention = /(ralsei|fluffy boy|toothpaste boy)/i;
const torielMention = /(toriel|tori)/i;
const familyMention = /(asgore|asriel|dess|december|noel|noelle|dreemurr|dreemurrs|the holidays)/i;
const mikeMention = /(mike)/i;
const mettatonMention = /(mettaton|mtt|metta)/i;
const workersMention = /(pippins|ramb|zapper|shadowguy|shuttah)/i;
const laninoElninaMention = /(lanino|elnina|the weather|weather duo|weather news team)/i;
const spamtonMention = /(spamton|email guy|old partner|ex partner|big shot|mail man|mailman|mail guy|spammy|shrimpton)/i;
const knightMention = /(the knight|roaring knight)/i;
const lancerMention = /(lancer|prancer|dancer|mr. generosity|chaos king|king wingy)/i;
const queenMention = /(queen|queenie|Q5U4EX7YY2E9N|queenie beanie)/i;
const whoMention = /(rouxls|battat|jongler|pluey|defernull|gaster)/i;

const insult = /(tiny nose|small nose|trash heap|i hate you|fuck you|kill yourself|you're a bitch|you suck|you're lame|you're annoying|boring)/i;
const insultOld = /(you're old|you're so old|old tv|obsolete|old)/i;
const insultShutUp = /(shut up|go away|leave me alone|nobody asked|who asked)/i;

const dontWorry = /(don't worry about it|it's not important|no worries|it's okay|it's ok|don't worry|dont worry|do not worry|its okay|ignore that)/i;
const youllSee = /(you'll see|you'll find out|you will|you will soon)/i;
const imSorry = /(sowwy|i'm sorry+|im sorry+|i'm so sorry+|im so sorry+|forgive me+|please forgive me+)/i;


// TODO: FRESH FROM THE JUICE and other quotes with responses (coming to your house, tennas balls, etc)
// Update him to respond with "sure" and "yes" to affirmatives
// Free Points responses
// add response to knowing about sex (virgin, etc)
// Mention list adds: Miku, Addisons, King (on his own)


module.exports = {
  offLimits,
  quizCommand,
  balanceCommand,
  introduceCommand,
  scheduleCommand,
  greeting,
  goodbye,
  goodMorning,
  goodnight,
  thankYou,
  compliment,
  loveFans,
  userFeelingGood,
  userFeelingBad,
  userDayGood,
  userDayBad,
  userVenting,
  tvQuestionWhen,
  tvQuestionRating,
  tvQuestionWhat,
  tvQuestionTVTime,
  tvQuestionHow,
  selfQuestionWho,
  selfQuestionHow,
  selfQuestionWhatsUp,
  selfQuestionWhat,
  selfQuestionLike,
  selfQuestionOpinion,
  pipisMention,
  emailMention,
  krisMention,
  susieMention,
  ralseiMention,
  torielMention,
  familyMention,
  mikeMention,
  mettatonMention,
  workersMention,
  laninoElninaMention,
  spamtonMention,
  knightMention,
  lancerMention,
  queenMention,
  whoMention,
  insult,
  insultOld,
  insultShutUp,
  dontWorry,
  youllSee,
  imSorry
};