// Part 2: [出題パターン, 質問, 正解, 誤答1, 誤答2, 解説]
const LISTEN2 = [
  // ---- WH疑問文 ----
  ["WH疑問文", "Where is the marketing meeting being held?", "In conference room B.", "At two o'clock.", "Yes, I'll be there.", "Where → 場所を答える。WH疑問文に Yes/No では答えない。"],
  ["WH疑問文", "When will the shipment arrive?", "By Thursday at the latest.", "At the loading dock.", "By express mail.", "When → 時を答える。"],
  ["WH疑問文", "Who's in charge of the new project?", "Ms. Tanaka from the design team.", "It's free of charge.", "Next to the projector.", "Who → 人を答える。charge / project の音のひっかけに注意。"],
  ["WH疑問文", "Why was the flight delayed?", "Because of bad weather.", "About two hours.", "At gate twelve.", "Why → 理由を答える。"],
  ["WH疑問文", "How often do you visit the Osaka branch?", "About once a month.", "By bullet train.", "For three days.", "How often → 頻度を答える。"],
  ["WH疑問文", "What time does the pharmacy close?", "I think it's open until nine.", "It's close to the station.", "Twice a day.", "close (閉まる) と close (近い) の同音ひっかけ。"],
  ["WH疑問文", "Whose laptop is this on the table?", "It must be Mr. Brown's.", "On the top shelf.", "A new model.", "Whose → 持ち主を答える。"],
  ["WH疑問文", "How long will the renovation take?", "At least three weeks.", "It's ten meters long.", "On the second floor.", "How long → 期間を答える。"],
  ["WH疑問文", "Which caterer should we hire for the banquet?", "The one we used last year.", "Yes, I'm hungry.", "On the higher floor.", "Which → The one 〜 で答えるのは定番。hire / higher の音のひっかけ。"],
  ["WH疑問文", "How much is the monthly membership fee?", "Fifty dollars.", "For twelve months.", "At the fitness center.", "How much → 金額を答える。"],
  ["WH疑問文", "Who should I give this report to?", "Leave it on my desk, please.", "Yes, I reported it.", "It's about sales.", "人名でなく「机に置いておいて」という間接的な応答が正解になるパターン。"],
  ["WH疑問文", "Where can I find the sales figures?", "Haven't you checked the shared folder?", "They're fine, thanks.", "I found it interesting.", "質問で返す応答も正解になり得る。"],
  ["WH疑問文", "When is the deadline for the proposal?", "Let me check my calendar.", "A new proposal.", "In the top drawer.", "「確認します」のような、直接答えない応答も頻出。"],
  ["WH疑問文", "Why don't we take a short break?", "That's a good idea.", "Because it was broken.", "For ten years.", "Why don't we 〜? は理由でなく「〜しませんか」という提案。break / broken のひっかけ。"],

  // ---- Yes/No 疑問文 ----
  ["Yes/No疑問文", "Have you finished the budget report?", "Not yet, I need another hour.", "It's a large budget.", "Yes, he reported it.", "Yes/No を言わずに状況を答えるパターン。"],
  ["Yes/No疑問文", "Is the printer on this floor working?", "No, it's out of order.", "I work on the fifth floor.", "Yes, I printed it.", "out of order「故障中」。work の多義 (働く/作動する) に注意。"],
  ["Yes/No疑問文", "Did you send the invoice to the client?", "Yes, this morning.", "No, I haven't met him.", "A voice message.", "invoice / voice の音のひっかけ。"],
  ["Yes/No疑問文", "Are you attending the conference in Berlin?", "No, Jim's going instead.", "Yes, it's a conference room.", "By plane.", "「代わりに Jim が行く」という応答。"],
  ["Yes/No疑問文", "Do you know when the bank opens?", "At nine, I believe.", "Yes, it's on Main Street.", "No, I don't have an account.", "間接疑問文。実質的には when への答え (時刻) が正解。"],
  ["Yes/No疑問文", "Has the new manager started yet?", "She starts next Monday.", "Yes, I managed it.", "It starts at seven.", "Yes/No を省いて具体的な情報を答えるパターン。"],
  ["Yes/No疑問文", "Can I get a copy of the handout?", "Sure, here you are.", "Two cups of coffee.", "He handed it in.", "許可・依頼には Sure. / Of course. が定番。copy / coffee のひっかけ。"],
  ["Yes/No疑問文", "Is there a pharmacy near here?", "There's one across the street.", "Yes, I'm a farmer.", "No, I didn't hear that.", "pharmacy / farmer、here / hear の音のひっかけ。"],

  // ---- 選択疑問文 ----
  ["選択疑問文", "Would you prefer a window seat or an aisle seat?", "An aisle seat, please.", "Yes, I would.", "The window is open.", "A or B の選択疑問文に Yes/No では答えない。"],
  ["選択疑問文", "Should we meet on Monday or Tuesday?", "Either day works for me.", "Yes, we should.", "At the meeting.", "Either「どちらでも」は選択疑問文の定番応答。"],
  ["選択疑問文", "Do you want to pay by cash or credit card?", "I'll use my card.", "No, it's not expensive.", "Yes, please.", "一方を選んで言い換えて答えるパターン。"],
  ["選択疑問文", "Will you drive to the airport or take the train?", "Actually, I'll take a taxi.", "Yes, the train was late.", "It's a long flight.", "どちらでもない第三の選択肢を答えるパターン。"],
  ["選択疑問文", "Is the workshop in the morning or the afternoon?", "It hasn't been decided yet.", "Yes, it was useful.", "At the shop.", "「まだ決まっていない」は多くの質問に対応できる定番応答。"],
  ["選択疑問文", "Would you like coffee or tea?", "Neither, thanks. I'm fine.", "Yes, I like it.", "At the café.", "Neither「どちらもいりません」。"],

  // ---- 付加・否定疑問文 ----
  ["付加・否定疑問文", "You've met Mr. Collins before, haven't you?", "Yes, at last year's trade show.", "No, I'll call him.", "He's collecting them.", "付加疑問文は普通の疑問文と同じように、事実が肯定なら Yes。"],
  ["付加・否定疑問文", "Isn't the store open on Sundays?", "No, it's closed on weekends.", "Yes, I stored it.", "On Sunday morning.", "否定疑問文も「開いていない」なら No。日本語の「はい/いいえ」と逆になるので注意。"],
  ["付加・否定疑問文", "The meeting starts at ten, doesn't it?", "It was moved to eleven.", "Yes, I met him.", "For ten people.", "Yes/No なしで訂正情報を答えるパターン。"],
  ["付加・否定疑問文", "Didn't you order more printer paper?", "Yes, it should arrive tomorrow.", "No, in alphabetical order.", "The newspaper.", "「注文した」なら Yes。order / paper のひっかけ。"],
  ["付加・否定疑問文", "This is the latest version of the contract, isn't it?", "No, there's a newer one.", "Yes, I'm late.", "He contacted me.", "latest / late、contract / contact のひっかけ。"],
  ["付加・否定疑問文", "Haven't you been to the new branch office?", "Not yet, but I plan to go soon.", "Yes, for lunch.", "A branch fell.", "Not yet で答えるパターン。"],

  // ---- 依頼・提案・申し出 ----
  ["依頼・提案", "Could you help me move these boxes?", "Sure, where do they go?", "I saw the movie.", "Yes, I moved last year.", "依頼に Sure で応じて質問を返すパターン。move / movie のひっかけ。"],
  ["依頼・提案", "Would you mind closing the window?", "Not at all.", "Yes, I closed the deal.", "It's near the window.", "Would you mind 〜? に「いいですよ」は Not at all. (気にしません)。"],
  ["依頼・提案", "How about having lunch at the new Italian place?", "Sounds great.", "I've had it for a year.", "About an hour.", "提案には Sounds great. / Good idea. が定番。"],
  ["依頼・提案", "Shall I send you the file by e-mail?", "That would be helpful, thanks.", "Yes, I filed it.", "By the mailbox.", "申し出 (Shall I 〜?) には感謝で応じる。"],
  ["依頼・提案", "Why don't you ask the supervisor?", "I already did.", "Because he's busy.", "A super idea.", "Why don't you 〜? は提案。Because で答えない。"],
  ["依頼・提案", "Would you like me to call a taxi for you?", "No thanks, I'll walk.", "Yes, I called him.", "It's a tax form.", "申し出を丁寧に断るパターン。taxi / tax のひっかけ。"],
  ["依頼・提案", "Can you cover my shift on Saturday?", "Sorry, I have plans that day.", "It's under the cover.", "Yes, I shifted it.", "依頼を理由つきで断るパターン。"],

  // ---- 平叙文 ----
  ["平叙文", "The copier on the third floor is out of paper.", "I'll get some from the supply room.", "Three copies, please.", "Yes, it's a good paper.", "問題の報告 → 解決策を申し出る応答。"],
  ["平叙文", "I can't find my security badge.", "Did you check your jacket pocket?", "It's a secure building.", "That's bad news.", "困りごと → 質問で助言する応答。badge / bad のひっかけ。"],
  ["平叙文", "Our sales went up again this quarter.", "That's great news.", "A quarter past two.", "Yes, they're on sale.", "良い知らせ → 喜ぶ応答。sales / sale のひっかけ。"],
  ["平叙文", "I think we should hire more staff.", "I agree, but the budget is tight.", "It's on a higher floor.", "Yes, he's the staff.", "意見 → 同意・反論で応じる。"],
  ["平叙文", "The client wants to move the meeting to Friday.", "That works for me.", "I moved to a new apartment.", "Yes, I met them.", "予定変更の知らせ → 都合を答える。"],
  ["平叙文", "I'm having trouble logging in to the system.", "Have you tried resetting your password?", "Yes, I traveled a lot.", "The log is very long.", "問題の報告 → 解決策を提案する応答。"],
];

// Part 3 (会話) / Part 4 (トーク)
// s: [話者(M/W), セリフ], q: [設問タイプ, 設問, 正解, 誤答1, 誤答2, 誤答3, 解説]
const LISTEN34 = [
  {
    k: "Part 3 会話",
    s: [
      ["W", "Hi, I'm calling about the laptop I ordered last week. The confirmation e-mail said it would arrive by Tuesday, but it still hasn't come."],
      ["M", "I'm sorry about that. Can I have your order number, please?"],
      ["W", "Sure, it's 4 4 7 2 9."],
      ["M", "Thank you. It looks like the package was delayed at our warehouse because of a snowstorm. It should reach you by tomorrow afternoon. To apologize, I'll refund the shipping fee."],
      ["W", "I appreciate that. Could you send me the tracking number?"],
      ["M", "Of course. I'll e-mail it to you right away."],
    ],
    q: [
      ["概要", "Why is the woman calling?", "An order has not been delivered.", "She received the wrong item.", "She wants to cancel an order.", "A laptop is not working.", "注文したノートPCがまだ届いていないと言っている。"],
      ["詳細", "What caused the problem?", "Bad weather", "A wrong address", "A system error", "A staff shortage", "because of a snowstorm → Bad weather と言い換えられている。"],
      ["次の行動", "What will the man probably do next?", "Send an e-mail", "Ship a new laptop", "Call the warehouse", "Visit the woman's office", "追跡番号をすぐメールで送ると言っている。"],
    ],
  },
  {
    k: "Part 3 会話",
    s: [
      ["M", "Sandra, do you have a minute? I'd like to talk about the training session for new employees next week."],
      ["W", "Sure. Is there a problem?"],
      ["M", "Well, twelve people have signed up, but the room we reserved only seats eight."],
      ["W", "Oh, I see. The large meeting room on the fifth floor is available on Wednesday. Why don't we move it there?"],
      ["M", "Good idea. But that room doesn't have a projector, does it?"],
      ["W", "No, but I can borrow one from the IT department. I'll ask them this afternoon."],
    ],
    q: [
      ["概要", "What are the speakers mainly discussing?", "Arrangements for a training session", "A job interview schedule", "A new company policy", "A broken projector", "新入社員研修の部屋について話している。"],
      ["詳細", "What problem does the man mention?", "A room is too small.", "A trainer is unavailable.", "Some employees are late.", "A date has been changed.", "12人申し込みがあるのに部屋は8席しかない。"],
      ["次の行動", "What does the woman say she will do?", "Contact another department", "Cancel the reservation", "Buy a new projector", "Reduce the number of participants", "IT部門にプロジェクターを借りられるか聞くと言っている。"],
    ],
  },
  {
    k: "Part 3 会話",
    s: [
      ["W", "Welcome to Parkside Hotel. How may I help you?"],
      ["M", "Hi, I have a reservation under the name Daniel Cho. I know check-in is at three, but my flight arrived early. Is my room ready?"],
      ["W", "Let me check. I'm afraid the room is still being cleaned. It will be ready in about an hour."],
      ["M", "I see. I have a meeting downtown at two, so I can't really wait."],
      ["W", "In that case, you're welcome to leave your suitcase with us. And here's a voucher for a free drink at our lobby café."],
      ["M", "That's very kind. I'll leave my bag here and grab a coffee before I go."],
    ],
    q: [
      ["概要", "Where does the conversation take place?", "At a hotel", "At an airport", "At a café", "At a travel agency", "Welcome to Parkside Hotel と言っている。"],
      ["詳細", "Why is the man unable to wait?", "He has an appointment.", "His flight leaves soon.", "He is feeling unwell.", "He needs to return a car.", "2時に会議がある。meeting → appointment の言い換え。"],
      ["詳細", "What does the woman give the man?", "A coupon for a beverage", "A room upgrade", "A map of downtown", "A discount on his stay", "a voucher for a free drink → a coupon for a beverage。"],
    ],
  },
  {
    k: "Part 3 会話",
    s: [
      ["M", "Have you seen the sales figures for the new energy drink? They're lower than we expected."],
      ["W", "I have. I think the problem is the price. It costs almost twice as much as our competitors' products."],
      ["M", "You might be right. But lowering the price isn't easy, because the ingredients are expensive."],
      ["W", "Then how about offering a smaller can at a lower price? People could try it without spending much."],
      ["M", "That could work. Let's bring it up at tomorrow's marketing meeting."],
      ["W", "OK. I'll put together some numbers tonight."],
    ],
    q: [
      ["概要", "What problem are the speakers discussing?", "Disappointing sales of a product", "A delay in production", "A shortage of ingredients", "A complaint from a customer", "新商品の売上が予想より低いという話。"],
      ["詳細", "What does the woman suggest?", "Selling the product in a smaller size", "Changing the ingredients", "Advertising on television", "Hiring a new supplier", "小さい缶を安く売ることを提案している。"],
      ["次の行動", "What will the woman do tonight?", "Prepare some data", "Attend a meeting", "Visit a competitor's store", "Design a new can", "put together some numbers → Prepare some data。"],
    ],
  },
  {
    k: "Part 4 トーク",
    s: [
      ["W", "Attention, passengers. This is an announcement for those traveling on Skyline Airways flight 302 to Singapore. Due to a mechanical inspection, the departure has been delayed by approximately ninety minutes. The new departure time is 4:45 P.M. The boarding gate has also been changed from gate 14 to gate 22. We apologize for the inconvenience. Passengers on this flight may pick up a meal voucher at the Skyline service counter next to gate 20. Thank you for your patience."],
    ],
    q: [
      ["概要", "Where is this announcement being made?", "At an airport", "At a train station", "On an airplane", "At a bus terminal", "flight / boarding gate から空港だと分かる。"],
      ["詳細", "What is the reason for the delay?", "An inspection of the aircraft", "Bad weather", "A late connecting flight", "Heavy air traffic", "Due to a mechanical inspection とある。"],
      ["詳細", "What can passengers receive at the service counter?", "A meal voucher", "A new ticket", "A refund", "A seat upgrade", "サービスカウンターで食事券を受け取れる。"],
    ],
  },
  {
    k: "Part 4 トーク",
    s: [
      ["M", "Hello, this is a message for Ms. Rivera. This is James from Central Dental Clinic. I'm calling about your appointment on Thursday at 10 A.M. Unfortunately, Dr. Singh will be attending a conference that day, so we need to reschedule. We have openings on Friday at 9 A.M. or next Monday at 3 P.M. Please call us back at 555-0118 and let us know which time is better for you. Our office is open until six today. Thank you."],
    ],
    q: [
      ["概要", "What is the purpose of the message?", "To reschedule an appointment", "To confirm a payment", "To advertise a new clinic", "To give test results", "予約の変更をお願いする留守電メッセージ。"],
      ["詳細", "Why is Dr. Singh unavailable on Thursday?", "He will be at a conference.", "He is on vacation.", "He is sick.", "He has another patient.", "学会 (conference) に出席するため。"],
      ["次の行動", "What is the listener asked to do?", "Return a phone call", "Visit the clinic today", "Send an e-mail", "Fill out a form", "Please call us back → Return a phone call。"],
    ],
  },
  {
    k: "Part 4 トーク",
    s: [
      ["W", "Good morning, everyone, and welcome to the Greenfield Chocolate Factory tour. My name is Amy, and I'll be your guide today. The tour takes about forty-five minutes. First, we'll watch a short video about the history of the company. Then we'll walk through the production area, where you can see how our chocolate is made. Please remember that taking photographs is not allowed inside the production area. At the end of the tour, you'll receive some free samples, and you can use your tour ticket to get ten percent off in the gift shop. Now, please follow me to the theater."],
    ],
    q: [
      ["概要", "Who most likely is the speaker?", "A tour guide", "A factory engineer", "A shop clerk", "A film director", "I'll be your guide today と言っている。"],
      ["詳細", "What are the listeners told not to do?", "Take pictures in a certain area", "Eat during the tour", "Touch the machines", "Leave the group", "生産エリア内では写真撮影禁止。"],
      ["次の行動", "What will the listeners do next?", "Watch a video", "Taste some samples", "Visit the gift shop", "Enter the production area", "最初にビデオを見る → シアターへ移動する。"],
    ],
  },
  {
    k: "Part 4 トーク",
    s: [
      ["M", "Before we finish today's meeting, I have one more announcement. As you know, our office will move to the new building on Carter Street at the end of this month. The moving company will come on Friday the 28th, so please pack your personal belongings by Thursday evening. Boxes and labels are available in the storage room. Make sure you write your name and department on each label. Also, the parking lot at the new building is still under construction, so I recommend using public transportation for the first two weeks. If you have any questions, please talk to Linda in general affairs."],
    ],
    q: [
      ["概要", "What is the announcement mainly about?", "An office relocation", "A new parking policy", "A building renovation", "A department meeting", "月末に新しいビルへ移転するという連絡。"],
      ["詳細", "What are the listeners asked to do by Thursday?", "Pack their belongings", "Order boxes", "Sign a contract", "Clean the storage room", "木曜の夜までに私物を箱詰めする。"],
      ["詳細", "Why does the speaker recommend using public transportation?", "The parking area is not finished.", "The new office is far from the station.", "Parking fees will increase.", "The street will be closed.", "駐車場がまだ工事中 (under construction) のため。"],
    ],
  },
];
