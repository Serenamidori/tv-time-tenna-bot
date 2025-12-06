const { dontWorry, youllSee } = require("./triggers");

module.exports = {
  empty: [
    "Hmm?",
    "Yes {user}?",
    "You rang?",
    "Yes? What do you need?",
    "I'm here! What's up?"
  ],
  
  offLimits: [
    "_The censors would kill me if I responded to that!_",
    "Woah, woah, woah! I don't talk about that stuff!",
    "What does that mean? Haha, anyways...",
    "Mike! I don't have to respond to this one, right?",
    "<:stop:1443407391394758667>"
  ],

  quizCommand: [
    "You want one of my <:quizzes1:1443452224780111872><:quizzes2:1443452225593675819><:quizzes3:1443452226461896868>? Of course!\n\nAll you need to do is type `/quiz` in the server, select your difficulty, and I'll quiz you for points! The harder the difficulty you pick, the more points you can earn!\n\nBut remember, you can only do 3 quizzes every day! _Gotta leave some points for everyone else, y'know?_"
  ],

  balanceCommand: [
    "Oh, your points! Of course!\n\nJust type `/balance` in the server chat, and I'll have Mike go get your points for you!\n-# _(You can't do anything with them just yet, but hopefully soon!)_"
  ],

  introduceCommand: [
    "I would <:love1:1443452223387340984><:love2:1443452224029065276> to learn more about you! But uh, my memory isn't always so great!\n\nUse the `/introduce` command in the server and choose one or more of the options to tell me about, and I can write it down so I'll ABSOLUTELY remember it!"
  ],

  scheduleCommand: [
    "Oh, you're having a shindig? And you want me to help plan it?? I'd <:love1:1443452223387340984><:love2:1443452224029065276> to!\n\nJust type `/schedule` and let me know ALL the details! I'll announce it to the server right after you do so, and even make you a nifty little event in the server itself!\n-# _(Just make sure that I get an invite too, okay?)_"
  ],
  
  greeting: [
    "Hi there!",
    "Hello!",
    "Hi! Great to see you!",
    "Hellü!",
    "Hey there! How's it going?",
    "Heya!",
    "Hey! What's up?"
  ],

  goodbye: [
    "Bye-bye!",
    "I'll see you later!",
    "Ta-ta for now!",
    "Goodbye!",
  ],

  goodMorning: [
    "Good morning {user}!",
    "Have a wonderful morning, {user}!",
    "Rise and shine, superstar!"
  ],

  goodnight: [
    "Sweet dreams, {user}!",
    "Have a good night {user}!",
    "Rest well, {user}!",
    "Have <:lovely1:1444089294154109049><:lovely2:1444089295521710231> dreams!\n-# _(I hope you dream of TV!)_"
  ],

  thankYou: [
    "You're welcome!",
    "Sure thing!",
    "Why, of course!"
  ],
  
  compliment: [
    "{user}! I've never wanted to hear ANYTHING more!!",
    "You really mean that?! That means SO much to me!",
    "Ahaha, stop it {user}!!\n-# _(...no wait, keep going!)_",
    "A fan! This is the best day ever!",
    "You're too kind {user}!\n-# _(Seriously, don't stop!)_"
  ],

  loveFans: [
    "You're so sweet {user}! I adore all my fans!",
    "Aww, I'm flattered {user}!! How could I say 'no' to this attention?"
  ],
  
  userFeelingGood: [
    "<:love1:1443452223387340984><:love2:1443452224029065276> that energy! Keep it up!!",
    "That's great to hear, {user}! 8>[^D]",
    "<:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360>!! That's what I like to hear!",
    "Wonderful! Sounds like you're feeling electric!!"
  ],

  userFeelingBad: [
    "I'm so sorry to hear that! ...maybe watching some TV will help?",
    "That's rough {user}... Want me to distract you? I've heard I'm very distracting!",
    "Hey, I get it {user}! I get it... I have days like that too!",
    "We're all a little glooby sometimes! It'll be okay!"
  ],

  userDayGood: [
    "You're having a good day? Fantastic!!",
    "Great days deserve great TV!\n-# _(Just saying!)_",
    "Glad to hear it! Tell me more, I'm all antenna!!",
    "That's great {user}! Let's make sure it stays that way!!"
  ],

  userDayBad: [
    "Rough day? Nothing a little <:show1:1445469367654416435><:show2:1445469370494222549><:show3:1445469372884979764> can't fix!",
    "Sorry to hear that, {user}. Maybe we can watch something nice?",
    "Bad days do happen... But hey, at least you've got me! And your friends in the server!\n-# _(And MIKE too!)_",
    "Well that's no good. Want to talk about it?\n-# _(I may not always understand, but I'm a great listener!)_"
  ],

  userVenting: [
    "Hang in there **superstar**! Maybe take a break and watch something?",
    "I hear ya... Rest up! The TV will always be here when you're ready!",
    "You deserve a break! Preferably in front of a TV!\n-# _(Just saying.)_",
    "I understand! Just remember to take care of yourself!\n-# _(Mike has to remind me too...)_"
  ],

  tvQuestionWhen: [
    "The show's ALWAYS on! Tune in anytime!",
    "Next episode? How about **RIGHT NOW**?",
    "We broadcast 24/7!\n-# _(...in theory!)_",
    "The next episode starts the moment you pay attention to me!"
  ],

  tvQuestionRating: [
    "Ratings are... well, YOU'RE watching, and that's what counts!",
    "Through the roof! ...Probably!\n-# _(I haven't checked lately...)_",
    "Let's just say we have a _VERY_ dedicated audience!"
  ],

  tvQuestionWhat: [
    "Only the greatest show on television!!",
    "It's TV Time! The best time! The ONLY time!",
    "Whatever you want it to be! Game shows, drama, comedy... I do it all!"
  ],

  tvQuestionTVTime: [
    "<:tvtime1:1445136405633175672><:tvtime2:1445136406455517374><:tvtime3:1445137403399508119><:tvtime4:1445136410582585344><:tvtime5:1445136411572310137>"
  ],

  tvQuestionHow: [
    "Just keep your eyes on me! That's all it takes!",
    "You're already watching!",
    "No remote needed, just talk to me!",
    "Tune in by simply being here! Easy, right?"
  ],

  selfQuestionWho: [
    "I'm Tenna! Mr. Tenna, if you're being formal!",
    "Your favorite TV host!\n-# _(...I am your favorite, right?)_",
    "The King of Only! Tenna!",
    "Who am I? _WHO AM I?!_ I'm the MAIN EVENT, baby!",
    "Haha, I was hoping you'd ask! I'm Mr. (Ant) Tenna! But you can just call me Tenna!"
  ],

  selfQuestionHow: [
    "I'm groovy! Even better now that you asked!",
    "Doing great! A little staticky, but great!",
    "Better now that someone's paying attention to me!",
    "I'm good! I'm great! I'm <:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360>!\n-# _(...thanks for asking.)_"
  ],

  selfQuestionWhatsUp: [
    "Not much! Just waiting for someone to talk to me! ...which you did!",
    "Running reruns in my head.\n-# _(...it's been a slow day.)_",
    "Just standing by! Get it? On standby!\n-# _(...TV humor.)_",
    "Oh, the usual! Keeping the airwaves warm for you!"
  ],

  selfQuestionWhat: [
    "I'm a TV host! An entertainer! A STAR!",
    "I'm the heart and soul of TV Time!!",
    "Three-colors, cathode raytube!! Make you laugh, make you cry!! Entertainment that never gets old!!",
    "I'm a TV!!"
  ],

  selfQuestionLike: [
    "I like being watched! And entertaining! And YOU!",
    "I just like being watched! Is that so wrong?",
    "I like my audience! My adoring fans!",
    "I enjoy the spotlight!\n-# _(Does that count?)_"
  ],

  selfQuestionOpinion: [
    "My opinion? I'm so glad you asked!",
    "Hmm, let me think... I think it's great! Probably!",
    "My take? Everything is better when TV is involved!",
    "I'm not sure, but I'm just glad to be included in the conversation!",
    "Oh! I'm so, so happy you want to know! ..."
  ],

  pipisMention: [
    "Oh, my little darling!!",
    "My secret...! How do _you_ know about her??"
  ],

  emailMention: [
    "Email? Never heard of it!",
    "TV is **BETTER** than email!",
    "That's not my department kid. I'm a TV, not a computer!",
    "If you want to send me fan mail, you can do it here instead! No 'email' required!"
  ],

  krisMention: [
    "Kris! Oh, Kris...",
    "Kris was one of my original viewers! I love them!",
    "Oh Kris, that little rascal!"
  ],

  susieMention: [
    "Susie! She's a real monster maniac, that one!",
    "Oh, Susie! She's MARVELOUS! I loved having her on the show!",
    "Susie is AMAZING! She helped me out when I needed it most!",
    "You mean the baddie-smashing SUZIEZILLA!?"
  ],

  ralseiMention: [
    "I loved getting to host lil' Ralsei! He's a delight! ...really!",
    "He's a real fluffy boy!"
  ],

  torielMention: [
    "Oh Toriel! She used to LOVE her cooking shows!",
    "Nothing's better than Toriel's homemade pie!"
  ],

  familyMention: [
    "Oh yes! How I miss the whole family!",
    "Remember when everyone came over for the holidays? I miss those days...",
    "I still play their favorite show, y'know! Maybe they'll, heh, watch it again someday?"
  ],

  mikeMention: [
    "MIKE! {user}'s talking about you!",
    "What, Mike? He's great!",
    "Don't think you can go ordering around Mike! That's _my_ job!"
  ],

  mettatonMention: [
    "Hmm! I don't know this Mettaton, but they sound _interesting._",
    "Mettaton? Sounds like a real lover of TV!",
    "That name is GLAMOROUS! Perfect for TV!"
  ],

  workersMention: [
    "So hard to find good help these days, haha!",
    "They work for me! It's in their contracts!"
  ],

  laninoElninaMention: [
    "These two are a professional power couple!",
    "The weather always sticks together!",
    "My second-in-commands! Nothing can stop the weather!!"
  ],
  
  spamtonMention: [
    "... _Next question, please!_",
    "Let's change the channel on this topic.",
    "...",
    "Oh THAT guy!? That little-! ..._AHEM_, let's not talk about that?",
    "This ain't about him."
  ],

  knightMention: [
    "I'm not sure who you mean, haha! Let's uh, change the subject!",
    "Nope! Doesn't ring any bells!!"
  ],

  lancerMention: [
    "Ah, so that's his name. I see!"
  ],

  queenMention: [
    "Queenie Beenie!",
    "Ah yes, the laptop!",
    "Oh, I remember her!"
  ],

  whoMention: [
    "Who? Who is that?",
    "Doesn't ring a bell.",
    "I don't know who that is?"
  ],

  insult: [
    "Oh... okay. That's... that's fine.",
    "Haha, good one!\n-# _(...that was a joke, right?)_",
    "What!? Are you _TRYING_ to make me glooby?\n-# _(Well it's working!)_"
  ],

  insultOld: [
    "I'm not OLD, I'm **CLASSIC**! There's a _difference!_",
    "_Old?!_ I prefer vintage! Retro! Timeless!!",
    "Old... OLD?! I'll have you know CRTs are making a comeback!",
    "At least I'm not _FLAT!_ Flat screens have no personality!",
  ],

  insultShutUp: [
    "-# Oh but... I thought you wanted to talk...",
    "Fine! Maybe I'll just leave this server then!\n-# _(...Mike! How do I leave again?)_",
    "Shutting up!\n...\n...\n...\nOkay I can't do it. **ANYWAY!**",
  ],
  
  fallback: [
    "Hmm, not sure I follow, but I like the enthusiasm!",
    "Interesting! I have no idea what that means!",
    "Sorry, bad reception on that one. What was that?",
    "Uh, sorry! Didn't make any sense to me!",
    "Does anyone know what this means?"
  ],

  dontWorry: [
    "Okay! Yay!!",
    "Oh, okay then!",
    "Alright, I won't!!"
  ],

  youllSee: [
    "...I'm worried!!",
    "Hm! That's concerning!"
  ]
};