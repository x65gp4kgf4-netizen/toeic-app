// k: 文書の種類, t: タイトル, x: 本文, q: [設問タイプ, 設問, 正解, 誤答1, 誤答2, 誤答3, 解説]
const PART7 = [
  {
    k: "Eメール", t: "Quarterly meeting",
    x: `To: All Sales Staff
From: Karen Mills, Sales Director
Date: June 3
Subject: Quarterly meeting

Dear team,

Please note that our quarterly sales meeting, originally scheduled for June 10, has been moved to June 12 because the main conference room is being renovated. The meeting will now take place in Room 305 on the third floor, starting at 10:00 A.M.

Each regional manager should prepare a ten-minute presentation on second-quarter results. Please send your slides to my assistant, Tom Reed, by June 9 so that he can combine them into a single file.

Lunch will be provided after the meeting. If you have any dietary restrictions, let Tom know by the end of this week.

Best regards,
Karen Mills`,
    q: [
      ["主旨・目的", "What is the purpose of the e-mail?", "To announce a change to a meeting", "To introduce a new assistant", "To report quarterly sales results", "To request a room reservation", "冒頭で「6月10日の会議が12日に変更された」と伝えている。"],
      ["詳細", "Why was the meeting rescheduled?", "A room is being renovated.", "The director will be away.", "Sales results are not ready.", "A manager requested a delay.", "because the main conference room is being renovated とある。"],
      ["詳細", "What are regional managers asked to do by June 9?", "Send presentation materials to Mr. Reed", "Reserve Room 305", "Order lunch for the team", "Combine the slides into one file", "slides を Tom Reed に送るよう指示されている。ファイルをまとめるのは Tom の仕事。"],
    ],
  },
  {
    k: "お知らせ", t: "Elevator maintenance",
    x: `NOTICE TO ALL TENANTS — Harbor View Tower

The east elevators will be out of service from Monday, October 14, through Wednesday, October 16, for scheduled maintenance. During this period, please use the west elevators or the stairs. Because fewer elevators will be running, you may experience longer waiting times, especially between 8:00 and 9:30 A.M.

Tenants who are expecting large deliveries on these days should contact the building management office at least 24 hours ahead of time so that the freight elevator can be reserved.

We apologize for the inconvenience and appreciate your cooperation.

Building Management Office (ext. 100)`,
    q: [
      ["主旨・目的", "What is the notice mainly about?", "A temporary elevator closure", "A change in office hours", "A new delivery company", "The opening of a new stairway", "東側エレベーターが保守点検で3日間使えないという告知。"],
      ["詳細", "According to the notice, what might tenants experience in the morning?", "Longer waits for elevators", "Noise from construction", "Closed entrances", "Delayed deliveries", "you may experience longer waiting times, especially between 8:00 and 9:30 A.M. とある。"],
      ["詳細", "What should tenants expecting large deliveries do?", "Notify the management office in advance", "Use the west elevators", "Change the delivery date", "Carry items up the stairs", "24時間前までに管理事務所へ連絡する。ahead of time = in advance の言い換え。"],
    ],
  },
  {
    k: "広告", t: "Brightway Office Furniture",
    x: `BRIGHTWAY OFFICE FURNITURE — Spring Clearance Sale

From April 1 to April 15, save up to 40 percent on desks, chairs, and storage cabinets at all Brightway stores. Our best-selling ErgoPlus chair is now only $149.

- Free delivery on orders over $300
- Free assembly service for members of our Rewards Club
- All items come with a three-year warranty

Not a member yet? Sign up in any store or at www.brightway.example and receive a $20 coupon for your next purchase. Please note that sale prices do not apply to online orders.`,
    q: [
      ["詳細", "What is being advertised?", "A sale on office furniture", "The opening of a new store", "A furniture repair service", "A new line of chairs", "Spring Clearance Sale とあり、机・椅子・収納棚が割引される。"],
      ["詳細", "How can customers get free assembly?", "By joining the Rewards Club", "By spending over $300", "By ordering online", "By buying an ErgoPlus chair", "Free assembly service for members of our Rewards Club。$300超は無料配送の条件。"],
      ["NOT問題", "What is NOT mentioned as a benefit?", "A discount on online orders", "A three-year warranty", "Free delivery on large orders", "A coupon for new members", "sale prices do not apply to online orders とあり、オンライン注文は割引対象外。"],
    ],
  },
  {
    k: "チャット", t: "Text-message chain",
    x: `Maria Lopez (9:12 A.M.)
Hi Ken. I'm stuck in traffic on Route 9. There's been an accident ahead. I don't think I'll make it to the client presentation by 10.

Ken Ito (9:14 A.M.)
That's not good. Ms. Brandt from Norvia is already on her way here.

Maria Lopez (9:15 A.M.)
Could you start without me? The slides are in the shared folder under "Norvia Proposal."

Ken Ito (9:17 A.M.)
I can handle the introduction and the pricing section, but you know the technical details better than I do.

Maria Lopez (9:18 A.M.)
Fair enough. Begin with those two parts, and I'll join by video call from the car park as soon as I can pull over.

Ken Ito (9:19 A.M.)
Sounds like a plan. I'll set up the screen in the meeting room.`,
    q: [
      ["詳細", "Why will Ms. Lopez be late?", "A road accident has caused a delay.", "Her car has broken down.", "She went to the wrong office.", "Her earlier meeting ran long.", "I'm stuck in traffic ... There's been an accident ahead とある。"],
      ["意図問題", "At 9:18 A.M., what does Ms. Lopez mean when she writes, \"Fair enough\"?", "She accepts Mr. Ito's point.", "She thinks the price is reasonable.", "She is satisfied with the slides.", "She wants to cancel the presentation.", "Ken の「技術的な詳細は君の方が詳しい」という指摘を受け入れ、代案を出している。"],
      ["推測", "What will Mr. Ito most likely do next?", "Prepare equipment for a video call", "Drive to pick up Ms. Lopez", "Call Ms. Brandt to reschedule", "Rewrite the technical section", "I'll set up the screen in the meeting room と言っている。"],
    ],
  },
  {
    k: "記事", t: "Local bakery expands",
    x: `RIVERTON (May 8) — Golden Crust Bakery, a family-owned business that has operated on Elm Street for over thirty years, announced yesterday that it will open a second location in the Lakeside shopping district this September. — [1] —

Owner Paul Varga said the decision was driven by growing demand. "On weekends, customers line up outside before we open, and we often sell out by noon," he said. — [2] — The new shop will be nearly twice the size of the original and will include a café area with seating for forty people.

Golden Crust plans to hire about fifteen new employees, including bakers and counter staff. — [3] — Mr. Varga's daughter, Elena, who studied pastry making in France, will manage the new store. — [4] —`,
    q: [
      ["主旨・目的", "What is the article mainly about?", "The expansion of a local business", "The retirement of a bakery owner", "A new shopping district", "A cooking school in France", "老舗ベーカリーが2号店を出すという記事。"],
      ["推測", "What is suggested about the Elm Street location?", "It does not have enough capacity to meet demand.", "It will close in September.", "It has a large café area.", "It was recently renovated.", "開店前に行列ができ、昼には売り切れる → 需要に対応しきれていないと推測できる。"],
      ["文挿入", "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n\"Applications will be accepted at the Elm Street shop starting next month.\"", "[3]", "[1]", "[2]", "[4]", "採用人数について述べた文の直後 [3] に入れると、応募 (applications) の話が自然につながる。"],
    ],
  },
  {
    k: "求人広告", t: "Job opening",
    x: `POSITION AVAILABLE: Event Coordinator — Summit Hotels Group

Summit Hotels Group is seeking an experienced event coordinator for its downtown Chicago hotel. The successful candidate will plan and manage conferences, weddings, and corporate events, working closely with clients and the catering team.

Requirements:
- At least three years of experience in event planning or hotel management
- Excellent communication skills
- Ability to work evenings and weekends when necessary

A degree in hospitality management is preferred but not required. We offer a competitive salary, health insurance, and discounted stays at all Summit hotels worldwide.

To apply, send your résumé and a cover letter to careers@summithotels.example by August 20. Only applicants selected for an interview will be contacted.`,
    q: [
      ["詳細", "What is a requirement of the position?", "Experience in a related field", "A university degree in hospitality", "Fluency in a second language", "A driver's license", "3年以上の経験が必須。学位は preferred but not required (あれば望ましいが必須ではない)。"],
      ["NOT問題", "What is NOT listed as an employee benefit?", "Free meals at the hotel", "Health insurance", "Reduced rates at hotels", "A competitive salary", "食事の無料提供には触れられていない。discounted stays = reduced rates。"],
      ["推測", "What is implied about the application process?", "Not all applicants will receive a reply.", "Interviews will be held online.", "Applications must be delivered in person.", "The deadline may be extended.", "Only applicants selected for an interview will be contacted → 全員に返事が来るわけではない。"],
    ],
  },
  {
    k: "レビュー", t: "Customer review",
    x: `Product: AeroBrew Coffee Maker (Model AB-200)
Rating: 3 out of 5
Reviewer: D. Howard

I bought the AeroBrew last month to replace my old coffee maker. First, the good points: it brews a full pot in under five minutes, and the coffee stays hot for hours thanks to the insulated pot. The timer function is also handy, as I can set it the night before.

However, I have a couple of issues. The water tank is hard to fill because the opening is so narrow, and I often spill water on the counter. Also, the instruction manual was confusing; it took me a while to figure out how to set the clock.

When I contacted customer service, the representative was polite and walked me through the settings right away. Overall, it is a decent machine, but the design could be improved.`,
    q: [
      ["詳細", "What does Mr. Howard like about the product?", "It makes coffee quickly.", "It is easy to fill with water.", "It has a simple manual.", "It is inexpensive.", "it brews a full pot in under five minutes とある。"],
      ["同義語", "The word \"handy\" in paragraph 1 is closest in meaning to", "useful", "nearby", "manual", "small", "ここでの handy は「便利な」の意味。"],
      ["詳細", "What is indicated about the customer service representative?", "The representative helped solve a problem promptly.", "The representative offered a refund.", "The representative sent a new manual.", "The representative was difficult to reach.", "polite で right away に設定方法を教えてくれた。"],
    ],
  },
  {
    k: "ダブルパッセージ", t: "Workshop schedule and e-mail",
    x: `【Schedule】
Clearwater Business Center — November Workshops

Nov. 5   Effective Presentations       Instructor: Laura Kent    $80
Nov. 12  Spreadsheet Skills            Instructor: Raj Mehta     $95
Nov. 19  Time Management               Instructor: Laura Kent    $80
Nov. 26  Negotiation Basics            Instructor: Sam Ortiz     $110

All workshops run from 1:00 to 5:00 P.M. Register for two or more workshops at the same time and receive 15 percent off the total fee. Registration closes three days before each workshop.

【E-mail】
To: registration@clearwaterbc.example
From: Yuki Hara
Date: November 7
Subject: Workshop registration

Hello,

I would like to register for the workshop taught by Mr. Mehta and the one on negotiation. I understand that I qualify for the discount.

Also, I attended Ms. Kent's workshop earlier this week and found it extremely helpful. Is there any chance she will offer it again next year? Several of my coworkers are interested.

Thank you,
Yuki Hara`,
    q: [
      ["クロスリファレンス", "On what date will Ms. Hara attend her first registered workshop?", "November 12", "November 5", "November 19", "November 26", "Mr. Mehta が教えるのは Spreadsheet Skills (11月12日)。もう一つは26日。"],
      ["詳細", "Why does Ms. Hara qualify for a discount?", "She is registering for two workshops at once.", "She is a returning customer.", "Her coworkers are also registering.", "She registered a month early.", "2つ以上を同時に申し込むと15%割引。"],
      ["クロスリファレンス", "Which workshop did Ms. Hara already attend?", "Effective Presentations", "Time Management", "Spreadsheet Skills", "Negotiation Basics", "メールは11月7日付で「今週 Ms. Kent のワークショップに出た」→ 11月5日の Effective Presentations。19日はまだ先。"],
      ["詳細", "What does Ms. Hara ask about?", "Whether a workshop will be repeated", "Whether the fee can be refunded", "Whether the time can be changed", "Whether materials are included", "Is there any chance she will offer it again next year? と尋ねている。"],
    ],
  },
  {
    k: "注文確認", t: "Order confirmation",
    x: `PrintPoint Online — Order Confirmation
Order No.: 58213        Date: March 2
Customer: Grant & Lee Accounting

Item                               Qty     Price
Business cards (500 per box)       4       $72.00
Letterhead paper (1,000 sheets)    1       $45.00
Envelopes with logo (500)          2       $60.00
                                   Subtotal: $177.00
                                   Shipping:   $0.00
                                   Total:    $177.00

Estimated delivery: March 9

Note: Your order qualifies for free shipping because it exceeds $150. Changes to the design can be made at no charge until the order status shows "In Production." After that, a $15 fee will apply. For questions, call 555-0142.`,
    q: [
      ["詳細", "Why is there no shipping charge?", "The order total is over a certain amount.", "The customer is a member.", "The items will be picked up in person.", "A coupon was used.", "$150 を超える注文は送料無料。"],
      ["推測", "What kind of business most likely placed the order?", "An accounting firm", "A printing company", "A delivery service", "A design studio", "Customer: Grant & Lee Accounting とある。PrintPoint は注文を受けた側。"],
      ["詳細", "According to the note, when will a fee be charged for design changes?", "After production has begun", "After the order is delivered", "Before March 2", "When the order is under $150", "ステータスが In Production になった後は $15 の手数料がかかる。"],
    ],
  },
  {
    k: "社内メモ", t: "New expense system",
    x: `MEMO
To: All employees
From: Finance Department
Re: New expense reporting system

Starting July 1, all travel and business expenses must be submitted through ExpensePro, our new online system. Paper forms will no longer be accepted after June 30.

With ExpensePro, you can photograph receipts with your phone and upload them directly. Approved expenses will be reimbursed within five business days, compared with the current two weeks.

Training sessions will be held in the 4th-floor training room on June 18 and June 20 at 2:00 P.M. Each session lasts about an hour, and you need to attend only one. To sign up, reply to this memo with your preferred date. Those who cannot attend either session may watch a recorded version on the company intranet.`,
    q: [
      ["主旨・目的", "What is the purpose of the memo?", "To introduce a new procedure for expense claims", "To announce a change in the travel budget", "To remind staff of a payment deadline", "To advertise a training company", "新しい経費精算システム ExpensePro の導入を知らせている。"],
      ["詳細", "What is an advantage of the new system?", "Faster reimbursement", "Higher spending limits", "No need for receipts", "Automatic approval", "払い戻しが2週間 → 5営業日以内に短縮される。"],
      ["詳細", "How should employees register for training?", "By responding to the memo", "By visiting the 4th floor", "By logging in to ExpensePro", "By calling the Finance Department", "reply to this memo with your preferred date とある。"],
      ["推測", "What is suggested about the training sessions?", "The same content is covered in both.", "They are required for managers only.", "They last a full day.", "They will be held online only.", "you need to attend only one → 2回とも同じ内容だと推測できる。"],
    ],
  },
];
