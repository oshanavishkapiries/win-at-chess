/**
 * Master Opening Theory and Teacher's Guide Database
 * Analyzed with Stockfish 16 NNUE & Master Tournament Practice
 */

export const OPENINGS_THEORY = {
  'Caro-Kann Defense': {
    philosophy: 'A rock-solid counter-punching defense. Black prepares ...d5 while keeping the diagonal open for the light-squared Bishop (...Bf5 or ...Bg4) BEFORE locking the pawn chain with ...e6. Black accepts slightly less space in exchange for zero pawn weaknesses and a superior endgame.',
    keyLines: [
      { name: 'Advance Variation (3.e5 Bf5)', desc: 'White gains space; Black develops the Bishop to f5, then plays ...e6, ...c5, and ...Nc6 to dismantle White\'s d4 pawn center.' },
      { name: 'Classical Line (3.Nc3 dxe4 4.Nxe4 Bf5)', desc: 'Main line leading to solid positions where Black trades bishops and castles with an unbreachable pawn fortress.' },
      { name: 'Fantasy Variation (3.f3 dxe4 4.fxe4 e5!)', desc: 'White attempts a giant center; Black immediately detonates it with 4...e5! striking at White\'s uncastled King.' },
      { name: 'Panov Attack (3.exd5 cxd5 4.c4)', desc: 'Sharp Isolated Queen\'s Pawn (IQP) structure. Black blockades d4 with ...Nf6 and ...Nc6.' }
    ],
    pawnBreaks: 'Primary: ...c5! (shredding White\'s d4 base). Secondary: ...f6 (in the Advance variation to break the e5 wedge).',
    tactics: 'Queen infiltration to a5/b6; pin on White\'s d4 pawn; trading into king-and-pawn endgames where Black\'s pawn structure is healthier.',
    coachTip: 'In the Caro-Kann, Black\'s King is rarely mated. Teach your student: Bishop outside first (...Bf5), lock the door (...e6), strike the base (...c5), and win the endgame.'
  },
  'Scandinavian Defense': {
    philosophy: 'Immediately challenges White\'s e4 pawn on move 1. Eliminates White\'s central anchor and opens the d-file. Teaches students Queen mobility, open file management, and piece-driven counterplay.',
    keyLines: [
      { name: 'Mieses-Kotroc (2...Qxd5 3.Nc3 Qa5)', desc: 'Black develops ...Nf6, ...c6, ...Bf5, and ...e6, creating a safe retreat square on c7/d8 for the Queen.' },
      { name: 'Modern 3...Qd6 Line', desc: 'A GothamChess favorite. The Queen dominates the central dark squares (e5/d4), followed by ...c6, ...Nf6, and ...0-0-0.' },
      { name: '2...Nf6 Modern Gambits', desc: 'Black delays recapturing with the Queen, opting for rapid piece development and sharp gambits (Portuguese/Icelandic).' }
    ],
    pawnBreaks: 'Primary: ...c5 or ...e5 once developed. Black often uses the semi-open d-file for heavy piece pressure.',
    tactics: 'Beware of White\'s discovered attacks against Qa5 with Nd5/Nb5. Always play ...c6 to give your Queen an escape route.',
    coachTip: 'Don\'t fear bringing the Queen out early as long as you give her an escape path with ...c6. Aim your Rooks down the open d-file.'
  },
  'Sicilian Defense': {
    philosophy: 'The most combative response to 1.e4. Trades a flank pawn (c-pawn) for White\'s central d-pawn, creating an asymmetrical struggle where Black possesses a central pawn majority (d7+e7 vs e4) and an open c-file.',
    keyLines: [
      { name: 'Najdorf (5...a6)', desc: 'Controls b5, prepares queenside expansion with ...b5, ...Bb7, and flexible central breaks with ...e5 or ...e6.' },
      { name: 'Dragon (5...g6)', desc: 'Fianchettos the dark-squared Bishop on g7, aiming directly at White\'s queenside down the long diagonal.' },
      { name: 'Alapin (2.c3 d5!)', desc: 'White wants d4; Black counters immediately with 2...d5! or 2...Nf6 before White consolidates.' },
      { name: 'Closed Sicilian (2.Nc3 & 3.g3)', desc: 'Positional maneuvering: White attacks on the kingside with f4-f5; Black expands on the queenside with ...b5.' }
    ],
    pawnBreaks: 'Black\'s Holy Grail: ...d5! If Black achieves ...d5 cleanly in the Sicilian, Black is almost always equal or winning.',
    tactics: 'The Sicilian is a race: White attacks Black\'s King; Black attacks White\'s Queenside down the c-file. Whoever hesitates loses.',
    coachTip: 'Teach your student to calculate accurately. In open Sicilians, piece activity and tempo trump pawn counting. Always look for the ...d5 strike.'
  },
  'London System': {
    philosophy: 'A universal, highly solid system for White. White develops the dark-squared Bishop to f4 before closing the pawn pyramid with c3-d4-e3. Extremely difficult for Black to surprise White.',
    keyLines: [
      { name: 'Classical London (c3-d4-e3)', desc: 'Solid pyramid structure. White plants a Knight on e5 and coordinates an attack with Bd3, Qf3, and Qh3.' },
      { name: 'Jobava London (1.d4 d5 2.Nc3 Nf6 3.Bf4)', desc: 'Popularized by GothamChess. Sharp and aggressive; White threatens Nb5 jumping into c7, leading to wild tactical skirmishes.' }
    ],
    pawnBreaks: 'White plays for e4 or c4 after piece coordination. Black seeks ...c5 and ...e5.',
    tactics: 'The Nb5 invasion into c7; if Black plays ...Bd6, White retreats Bg3 so that ...Bxg3 opens the h-file for White\'s Rook.',
    coachTip: 'The London is not boring if you know where the attack lies! Control the e5 outpost, point your light-squared Bishop at h7, and strike the King.'
  },
  'King\'s Indian & Pirc Defense': {
    philosophy: 'The ultimate hypermodern defense. Black allows White to take the entire center with pawns (e4+d4+c4), sets up a fianchettoed Bishop on g7, castles quickly, and detonates White\'s center with ...e5 or ...c5.',
    keyLines: [
      { name: 'Mar del Plata (Classical KID)', desc: 'Center locks with d5. White attacks the queenside with c5/b4; Black launches a full kingside pawn storm with ...f5, ...f4, ...g5, ...h5 to deliver checkmate!' },
      { name: 'Pirc Defense (1.e4 d6 2.d4 Nf6 3.Nc3 g6)', desc: 'Black challenges e4/d4 with ...c5 or ...e5, keeping White guessing about their king position.' }
    ],
    pawnBreaks: 'Closed center: ...f5! followed by ...f4. Open center: ...c5 or ...e5.',
    tactics: 'Kingside mating storms, Queen sacrifices on h3/h2, dark-squared Bishop slicing through White\'s Queenside.',
    coachTip: 'In the King\'s Indian, you are playing for checkmate. Don\'t fear losing pawns on the queenside; keep pushing pawns toward White\'s King until mate is delivered!'
  },
  'Vienna Game & Gambit': {
    philosophy: 'GothamChess\'s top recommendation for rapid improvement. White plays 2.Nc3 to control d5 while keeping the f-pawn free to strike with 3.f4! It combines the aggression of the King\'s Gambit with rock-solid positional safety.',
    keyLines: [
      { name: 'Vienna Gambit (2...Nf6 3.f4! exf4? 4.e5!)', desc: 'The club killer: 90% of amateur players capture 3...exf4?, allowing 4.e5! which kicks the Knight and wins on move 4!' },
      { name: 'Main Line Defense (3...d5! 4.fxe5 Nxe4)', desc: 'The grandmaster response. White plays 5.Qf3! or 5.Nf3 with a double-edged struggle.' },
      { name: 'Quiet Vienna (2...Nc6 3.Bc4)', desc: 'Transposes into favorable Italian lines with the option of an f4 expansion later.' }
    ],
    pawnBreaks: 'White\'s signature: f4! followed by e5 kick.',
    tactics: 'The e5 pawn kick trapping the f6 Knight; Queen checks on h5; Nd5 jumping into c7.',
    coachTip: 'Teach your student: If Black answers 2...Nf6, slam down 3.f4! If they take, play 4.e5 and watch their position collapse.'
  },
  'Italian Game & Evans Gambit': {
    philosophy: 'The foundation of classical chess education. Teaches the values of tempo, rapid piece development, and target identification (the weak f7 square).',
    keyLines: [
      { name: 'Giuoco Pianissimo (Quiet Italian)', desc: 'Strategic maneuvering with c3, d3, a4, and Nbd2-f1-g3, preparing an eventual d4 push.' },
      { name: 'Evans Gambit (4.b4!?)', desc: 'White sacrifices the b-pawn to gain two tempos with c3 and d4, seizing total central dominance and unleashing a ferocious attack on f7.' },
      { name: 'Two Knights (3...Nf6 4.Ng5 d5 5.exd5 Na5)', desc: 'The famous Fried Liver territory. High-stakes tactical battle.' }
    ],
    pawnBreaks: 'White breaks with d4. In Evans Gambit, White attacks before Black can castle.',
    tactics: 'Greek gift sacrifice on h7 (Bxh7+); fork tricks on f7; pins along the a2-g8 diagonal.',
    coachTip: 'Every student must master the Italian. It proves that time and piece harmony are often worth more than raw material.'
  },
  'Queen\'s Gambit & 1.d4': {
    philosophy: 'White offers a flank pawn (c4) to deflect Black\'s central pawn (d5) and gain central supremacy with e4. If Black accepts (2...dxc4), White easily regains the pawn with e3/e4 and Bxc4.',
    keyLines: [
      { name: 'QGD (2...e6)', desc: 'Solid reinforcement of d5. White uses the Carlsbad structure and Minority Attack (b4-b5) to target c6.' },
      { name: 'Slav Defense (2...c6)', desc: 'Black reinforces d5 without locking in their light-squared Bishop.' },
      { name: 'QGA (2...dxc4)', desc: 'Black surrenders the center and fights for piece counterplay with ...c5 and ...a6/...b5.' }
    ],
    pawnBreaks: 'White plays for e4 or the b4-b5 Minority Attack. Black seeks ...c5 or ...e5.',
    tactics: 'Pins on the c-file; pawn structure weaknesses; exploiting backward pawns in endgames.',
    coachTip: 'Teach students the Carlsbad pawn structure (cxd5 exd5). It is the single most important structure to master for 1.d4 players.'
  },
  'Dutch Defense': {
    philosophy: 'An aggressive, asymmetrical counter to 1.d4. By playing 1...f5, Black stakes immediate claim to the e4 square and prepares a kingside assault.',
    keyLines: [
      { name: 'Leningrad Dutch (...g6, ...Bg7)', desc: 'Combines the Dutch with the King\'s Indian. Dynamic attack on White\'s King.' },
      { name: 'Stonewall Dutch (...d5, ...e6, ...c6, ...f5)', desc: 'An iron wall in the center. Black plants a Knight on e4 and maneuvers the bad Bishop via ...Bd7-e8-h5!' }
    ],
    pawnBreaks: 'Black breaks with ...e5 or pushes ...f4 for kingside lines.',
    tactics: 'Watch out for the weakened e8-h5 diagonal around Black\'s uncastled King.',
    coachTip: 'High risk, high reward. Black must prioritize king safety before launching their kingside offensive.'
  },
  'Scotch Game': {
    philosophy: 'White immediately blows open the center on move 3 (1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4). Kasparov\'s secret weapon that avoids endless Ruy Lopez theory and produces open, dynamic battles.',
    keyLines: [
      { name: 'Mieses Line (4...Nf6 5.Nxc6 bxc6 6.e5)', desc: 'Sharp battle over White\'s advanced e5 pawn wedge.' },
      { name: 'Classical Line (4...Bc5 5.Be3 Qf6 6.c3)', desc: 'Direct piece tension against White\'s central d4 Knight.' }
    ],
    pawnBreaks: 'White breaks with d4 early; Black counters with ...d5.',
    tactics: 'Pins along the e-file; Knight sacrifices on d5.',
    coachTip: 'Great opening for students who like open positions with fast tactical clashes.'
  },
  'English Opening': {
    philosophy: 'Flank strategy controlling d5 with 1.c4. Essentially a Reversed Sicilian with an extra tempo for White. Focuses on long diagonal pressure from a fianchettoed Bishop on g2.',
    keyLines: [
      { name: 'Reversed Sicilian (1...e5 2.Nc3 Nf6 3.g3)', desc: 'White controls the long diagonal and plays for queenside expansion.' },
      { name: 'Symmetrical (1...c5)', desc: 'Deep positional maneuvering for central outposts.' }
    ],
    pawnBreaks: 'White breaks with d4 or b4; Black breaks with ...d5 or ...f5.',
    tactics: 'Long diagonal Bishop pins; Queen infiltration on c7.',
    coachTip: 'Teaches students positional patience and how to play on the flanks without rushing central pawn pushes.'
  },
  'French Defense': {
    philosophy: 'Black sets up a granite diagonal chain (f7-e6-d5). The key strategic battle revolves around Black\'s "bad" light-squared Bishop on c8, which Black either trades or activates around the pawn chain.',
    keyLines: [
      { name: 'Advance (3.e5 c5 4.c3 Nc6 5.Nf3 Qb6)', desc: 'Black relentlessly attacks White\'s d4 pawn base.' },
      { name: 'Winawer (3.Nc3 Bb4)', desc: 'Sharp pin on White\'s Knight, inflicting doubled c-pawns on White.' }
    ],
    pawnBreaks: 'Black\'s signature: ...c5! and later ...f6 to break the e5 chain.',
    tactics: 'Attacks against White\'s d4 pawn; Greek gift sacrifices against Black\'s castled King.',
    coachTip: 'Teach the difference between the French (Bishop trapped inside) and the Caro-Kann (Bishop liberated outside).'
  },
  'Ruy Lopez (Spanish)': {
    philosophy: 'The supreme classical opening. White develops the Bishop to b5 to pressure Black\'s Nc6 defender of the e5 pawn, building up slow positional pressure.',
    keyLines: [
      { name: 'Closed Morphy (3...a6 4.Ba4 Nf6 5.0-0 Be7)', desc: 'The gold standard of chess strategy. White maneuvers Nbd2-f1-g3 and strikes with d4.' },
      { name: 'Berlin Defense (3...Nf6 4.0-0 Nxe4)', desc: 'The Berlin Wall endgame; ultra-solid.' }
    ],
    pawnBreaks: 'White pushes c3 and d4; Black plays ...b5 and ...d5.',
    tactics: 'Pins on the e-file; Knight jumps to f5; kingside piece storms.',
    coachTip: 'Studying the Ruy Lopez teaches students how all pieces cooperate. It is the single best opening for deep strategic growth.'
  },
  'Nimzo-Indian & Queen\'s Indian': {
    philosophy: 'The premier counter to 1.d4. Black pins White\'s c3 Knight with 3...Bb4, stopping 4.e4. If White forces a trade with a3, Black gives White doubled c-pawns and blockades them.',
    keyLines: [
      { name: 'Rubinstein & Classical (4.e3 or 4.Qc2)', desc: 'Black targets the doubled c4 pawn and controls e4.' }
    ],
    pawnBreaks: 'Black breaks with ...c5 or ...d5; White pushes e4.',
    tactics: 'Dark square blockades; trapping White\'s misplaced pieces.',
    coachTip: 'Teaches students the concept of static pawn weaknesses vs dynamic piece activity.'
  },
  'Other Openings & Gambits': {
    philosophy: 'Creative sidelines and tactical gambits (King\'s Gambit, Bird\'s Opening, Benko Gambit, Polish).',
    keyLines: [
      { name: 'King\'s Gambit (1.e4 e5 2.f4)', desc: 'Romantic-era sacrificial attack to seize the center.' },
      { name: 'Bird\'s Opening (1.f4 d5)', desc: 'Dutch in reverse with White playing for an e5 outpost.' }
    ],
    pawnBreaks: 'Early f-pawn pushes to blow open files.',
    tactics: 'Open f-files, rapid piece sacrifices on f7, unexpected diagonal checks.',
    coachTip: 'Use these to teach students how to calculate under pressure and handle unusual positions without fear.'
  }
};
