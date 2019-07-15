# Thue-Morse Connect Four
Hi! My name's Matt. Welcome to my game!

In regular Connect Four, two players take turns dropping pieces into the board with the goal of forming a line of four pieces of their color in any direction. With perfect play, the first player can always force a win. I wanted to make a version of Connect Four without out a first player advantage, so instead of alternating turns, I based the turns off of the Thue-Morse sequence, which is in some sense the "most fair" turn sequence.

The turn sequence is such that players often get to play twice in a row, but never get to play three or more times in a row. Furthermore, if a game fills every square on the board, the board will alway be filled with 21 red pieces and 21 blue pieces. Every time you start a new game, the turn counter jumps to a random point in the Thue-Morse sequence and then increments as pieces are played.

There are two questions I have about this game. The first question is, did I succeed in eliminating the first player advantage? I think this is a rather difficult question to answer. Maybe it's not even well-defined, because the turn sequence changes each time you play the game. I dunno! The second question is, is this a fun game to play? Does the ability to move two times in a row create interesting new strategies, or is it too powerful, making the game too easy to win? You can help me answer this question by playing the game with your friends and emailing your feedback to matthewfelixyuan@gmail.com. Thanks!
