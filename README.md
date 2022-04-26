### React based minimalistic Bingo board

#### Installation

```bash
# git clone https://github.com/alexDou/react-bingo-board.git
# cd react-bingo-board
# npm insall // or yarn install
# npm run start // or yarn run start
```
Server runs on port 8080 by default <br /> 
[http://localhost:8080](http://localhost:8080)


#### Rules

1. Copy-Paste or enter names of your cards. 24 no more no less. each separated with a new line.
2. Enter up to 4 players.
3. Make a move with a press on bingo button in the middle.
4. A player has a win when on his/her move a horizontal or vertical row gets filled.
5. A game stops when 16 cards get called.
6. A game can have multiple winners, but if one of a diagonal gets filled, a game stops with a draw result.

###### About

A move generator uses [RandomNumberApi](http://www.randomnumberapi.com)
