const DRAGON_SPRITES = {
  1: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges">
    <rect x="6" y="2" width="4" height="1" fill="#283d2e"/>
    <rect x="5" y="3" width="6" height="1" fill="#53785d"/>
    <rect x="4" y="4" width="8" height="2" fill="#689f77"/>
    <rect x="6" y="4" width="2" height="2" fill="#d9a05b"/>
    <rect x="3" y="6" width="10" height="4" fill="#53785d"/>
    <rect x="5" y="7" width="2" height="2" fill="#f4c97e"/>
    <rect x="9" y="6" width="2" height="2" fill="#d9a05b"/>
    <rect x="4" y="10" width="8" height="2" fill="#3d5a45"/>
    <rect x="2" y="12" width="12" height="2" fill="#7a5230"/>
    <rect x="3" y="14" width="10" height="1" fill="#4a2816"/>
  </svg>`,

  2: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges">
    <rect x="5" y="2" width="1" height="2" fill="#d9a05b"/>
    <rect x="10" y="2" width="1" height="2" fill="#d9a05b"/>
    <rect x="5" y="4" width="6" height="4" fill="#53785d"/>
    <rect x="6" y="5" width="1" height="2" fill="#1a1a1a"/>
    <rect x="9" y="5" width="1" height="2" fill="#1a1a1a"/>
    <rect x="6" y="5" width="1" height="1" fill="#ffffff"/>
    <rect x="9" y="5" width="1" height="1" fill="#ffffff"/>
    <rect x="3" y="8" width="2" height="2" fill="#d9a05b"/>
    <rect x="11" y="8" width="2" height="2" fill="#d9a05b"/>
    <rect x="5" y="8" width="6" height="5" fill="#689f77"/>
    <rect x="6" y="9" width="4" height="3" fill="#f4c97e"/>
    <rect x="5" y="13" width="2" height="2" fill="#3d5a45"/>
    <rect x="9" y="13" width="2" height="2" fill="#3d5a45"/>
    <rect x="11" y="11" width="3" height="2" fill="#53785d"/>
  </svg>`,

  3: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges">
    <rect x="4" y="1" width="1" height="2" fill="#f4c97e"/>
    <rect x="8" y="1" width="1" height="2" fill="#f4c97e"/>
    <rect x="4" y="3" width="5" height="3" fill="#3d5a45"/>
    <rect x="5" y="4" width="1" height="1" fill="#f4c97e"/>
    <rect x="8" y="4" width="2" height="1" fill="#53785d"/>
    <rect x="1" y="5" width="3" height="4" fill="#d9a05b"/>
    <rect x="10" y="5" width="4" height="4" fill="#d9a05b"/>
    <rect x="5" y="6" width="5" height="6" fill="#53785d"/>
    <rect x="6" y="7" width="3" height="4" fill="#f4c97e"/>
    <rect x="5" y="12" width="2" height="3" fill="#283d2e"/>
    <rect x="8" y="12" width="2" height="3" fill="#283d2e"/>
    <rect x="10" y="11" width="4" height="2" fill="#3d5a45"/>
    <rect x="13" y="10" width="2" height="1" fill="#d9a05b"/>
  </svg>`,

  4: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges">
    <rect x="3" y="0" width="1" height="3" fill="#f4c97e"/>
    <rect x="7" y="0" width="1" height="3" fill="#f4c97e"/>
    <rect x="3" y="3" width="6" height="3" fill="#283d2e"/>
    <rect x="4" y="4" width="1" height="1" fill="#ff5e3a"/>
    <rect x="9" y="4" width="2" height="1" fill="#3d5a45"/>
    <rect x="12" y="3" width="3" height="2" fill="#ff7b29"/>
    <rect x="13" y="4" width="2" height="1" fill="#ffd166"/>
    <rect x="0" y="4" width="3" height="6" fill="#b84437"/>
    <rect x="9" y="6" width="6" height="5" fill="#b84437"/>
    <rect x="4" y="6" width="5" height="6" fill="#3d5a45"/>
    <rect x="5" y="7" width="3" height="5" fill="#d9a05b"/>
    <rect x="4" y="12" width="2" height="3" fill="#283d2e"/>
    <rect x="7" y="12" width="2" height="3" fill="#283d2e"/>
    <rect x="9" y="12" width="5" height="2" fill="#283d2e"/>
    <rect x="14" y="11" width="2" height="2" fill="#f4c97e"/>
  </svg>`
};

const DRAGON_DICTIONARY = {
  1: {
    stageName: "Egg",
    ruleSummary: "Egg Stage: ˈCV.CV • Fixed 1st-syllable stress (ˈ) • 9 consonants + 5 cardinal vowels.",
    words: [
      { id: 1,  english: "comfort",     ipa: "ˈgu.lo", synth: "ˈgulo", audio: "audio/stage1/egg_01_gulo.wav" },
      { id: 2,  english: "music",       ipa: "ˈli.no", synth: "ˈlino", audio: "audio/stage1/egg_02_lino.wav" },
      { id: 3,  english: "blanket",     ipa: "ˈtu.sa", synth: "ˈtusa", audio: "audio/stage1/egg_03_tusa.wav" },
      { id: 4,  english: "nest",        ipa: "ˈko.na", synth: "ˈkona", audio: "audio/stage1/egg_04_kona.wav" },
      { id: 5,  english: "rest",        ipa: "ˈnu.se", synth: "ˈnuse", audio: "audio/stage1/egg_05_nuse.wav" },
      { id: 6,  english: "warmth",      ipa: "ˈha.te", synth: "ˈhate", audio: "audio/stage1/egg_06_hate.wav" },
      { id: 7,  english: "darkness",    ipa: "ˈdo.ku", synth: "ˈdoku", audio: "audio/stage1/egg_07_doku.wav" },
      { id: 8,  english: "love",        ipa: "ˈka.ki", synth: "ˈkaki", audio: "audio/stage1/egg_08_kaki.wav" },
      { id: 9,  english: "attention",   ipa: "ˈne.da", synth: "ˈneda", audio: "audio/stage1/egg_09_neda.wav" },
      { id: 10, english: "incantation", ipa: "ˈho.wa", synth: "ˈhowa", audio: "audio/stage1/egg_10_howa.wav" },
      { id: 11, english: "clean",       ipa: "ˈwi.le", synth: "ˈwile", audio: "audio/stage1/egg_11_wile.wav" },
      { id: 12, english: "space",       ipa: "ˈsu.na", synth: "ˈsuna", audio: "audio/stage1/egg_12_suna.wav" },
      { id: 13, english: "heat",        ipa: "ˈge.ti", synth: "ˈgeti", audio: "audio/stage1/egg_13_geti.wav" },
      { id: 14, english: "whisper",     ipa: "ˈsi.lu", synth: "ˈsilu", audio: "audio/stage1/egg_14_silu.wav" },
      { id: 15, english: "watch",       ipa: "ˈto.gi", synth: "ˈtogi", audio: "audio/stage1/egg_15_togi.wav" }
    ]
  },
  2: {
    stageName: "Hatchling",
    ruleSummary: "Hatchling Stage: Unlocks codas, /ʃ ʒ tʃ dʒ ŋ ɹ j/, and variable 1st/2nd-syllable stress.",
    words: [
      { id: 16, english: "wash",    ipa: "ˈʃu.ʒon",  synth: "ˈʃuʒon",  audio: "audio/stage2/hatch_01_shuzhon.wav" },
      { id: 17, english: "milk",    ipa: "ˈtʃo.ŋa",  synth: "ˈtʃoŋa",  audio: "audio/stage2/hatch_02_tshonga.wav" },
      { id: 18, english: "grass",   ipa: "ˈge.ɹoŋ",  synth: "ˈgeɹoŋ",  audio: "audio/stage2/hatch_03_gerong.wav" },
      { id: 19, english: "growth",  ipa: "tʃiˈlaŋ",  synth: "tʃiˈlaŋ",  audio: "audio/stage2/hatch_04_tshilang.wav" },
      { id: 20, english: "pet",     ipa: "ˈʒo.kutʃ", synth: "ˈʒokutʃ", audio: "audio/stage2/hatch_05_zhokutsh.wav" },
      { id: 21, english: "babble",  ipa: "ˈje.ʃat",  synth: "ˈjeʃat",  audio: "audio/stage2/hatch_06_yeshat.wav" },
      { id: 22, english: "play",    ipa: "dʒiˈɹeŋ",  synth: "dʒiˈɹeŋ",  audio: "audio/stage2/hatch_07_dzhireng.wav" },
      { id: 23, english: "protect", ipa: "kuˈdʒol",  synth: "kuˈdʒol",  audio: "audio/stage2/hatch_08_kudzhol.wav" },
      { id: 24, english: "heal",    ipa: "ˈdʒu.ɹen", synth: "ˈdʒuɹen", audio: "audio/stage2/hatch_09_dzhuren.wav" },
      { id: 25, english: "ointment",ipa: "ˈɹa.ŋiʃ",  synth: "ˈɹaŋiʃ",  audio: "audio/stage2/hatch_10_rangish.wav" },
      { id: 26, english: "fly",     ipa: "ʃeˈnok",   synth: "ʃeˈnok",   audio: "audio/stage2/hatch_11_shenok.wav" },
      { id: 27, english: "teach",   ipa: "jaˈʃen",   synth: "jaˈʃen",   audio: "audio/stage2/hatch_12_yashen.wav" },
      { id: 28, english: "imitate", ipa: "suˈtʃoɹ",  synth: "suˈtʃoɹ",  audio: "audio/stage2/hatch_13_sutshor.wav" },
      { id: 29, english: "walk",    ipa: "tʃoŋ",     synth: "tʃoŋ",     audio: "audio/stage2/hatch_14_tshong.wav" },
      { id: 30, english: "jump",    ipa: "dʒeɹk",    synth: "dʒeɹk",    audio: "audio/stage2/hatch_15_dzherk.wav" }
    ]
  },
  3: {
    stageName: "Dragonet",
    ruleSummary: "Dragonet Stage: Unlocks onset clusters, /θ ð z x ʔ/, and vowel length (ː).",
    words: [
      { id: 31, english: "speak",          ipa: "ˈkɹiː.ʔox", synth: "ˈkɹiːʔox", audio: "audio/stage3/drake_01_kriiox.wav" },
      { id: 32, english: "socialize",      ipa: "ˈxliː.dʒon",synth: "ˈxliːdʒon",audio: "audio/stage3/drake_02_xliidzhon.wav" },
      { id: 33, english: "meat",           ipa: "ˈxɹaː.ʔu",  synth: "ˈxɹaːʔu",  audio: "audio/stage3/drake_03_xraau.wav" },
      { id: 34, english: "outside",        ipa: "ˈgwaː.ðen", synth: "ˈgwaːðen", audio: "audio/stage3/drake_04_gwaadhen.wav" },
      { id: 35, english: "home",           ipa: "ˈglaː.θu",  synth: "ˈglaːθu",  audio: "audio/stage3/drake_05_glaathu.wav" },
      { id: 36, english: "bandage",        ipa: "ˈðe.xɹuŋ",  synth: "ˈðexɹuŋ",  audio: "audio/stage3/drake_06_dhexrung.wav" },
      { id: 37, english: "knowledge",      ipa: "ˈθɹiː.zan", synth: "ˈθɹiːzan", audio: "audio/stage3/drake_07_thriizan.wav" },
      { id: 38, english: "fire",           ipa: "xɹaːʔ",     synth: "xɹaːʔ",     audio: "audio/stage3/drake_08_xraa.wav" },
      { id: 39, english: "hover",          ipa: "ˈʃɹiː.ʔal", synth: "ˈʃɹiːʔal", audio: "audio/stage3/drake_09_shriial.wav" },
      { id: 40, english: "pounce",         ipa: "ˈdɹaː.ziʃ", synth: "ˈdɹaːziʃ", audio: "audio/stage3/drake_10_draazish.wav" },
      { id: 41, english: "dive",           ipa: "kɹoˈzaːʔ",  synth: "kɹoˈzaːʔ",  audio: "audio/stage3/drake_11_krozaa.wav" },
      { id: 42, english: "handshake",      ipa: "ˈkwiː.zol", synth: "ˈkwiːzol", audio: "audio/stage3/drake_12_kwiizol.wav" },
      { id: 43, english: "high five",      ipa: "ʃweˈzaːt",  synth: "ʃweˈzaːt",  audio: "audio/stage3/drake_13_shwezaat.wav" },
      { id: 44, english: "accomplishment", ipa: "gweˈθaːk",  synth: "gweˈθaːk",  audio: "audio/stage3/drake_14_gwethaak.wav" },
      { id: 45, english: "reward",         ipa: "tɹuˈʔiːs",  synth: "tɹuˈʔiːs",  audio: "audio/stage3/drake_15_truiis.wav" }
    ]
  },
  4: {
    stageName: "Dragon",
    ruleSummary: "Dragon Stage: Full 28-key inventory • Clusters in multiple positions & medial /ʔ/.",
    words: [
      { id: 46, english: "freedom",       ipa: "ˈʃwaː.ðex",   synth: "ˈʃwaːðex",   audio: "audio/stage4/dragon_01_shwaadhex.wav" },
      { id: 47, english: "hunt",          ipa: "ˈxɹaːŋ.ʔuʃ",  synth: "ˈxɹaːŋʔuʃ",  audio: "audio/stage4/dragon_02_xraangush.wav" },
      { id: 48, english: "adventure",     ipa: "gwaˈxɹiː.ʔot", synth: "gwaˈxɹiːʔot", audio: "audio/stage4/dragon_03_gwaxriiot.wav" },
      { id: 49, english: "guard",         ipa: "ˈgɹaː.θɹox",  synth: "ˈgɹaːθɹox",  audio: "audio/stage4/dragon_04_graathrox.wav" },
      { id: 50, english: "seek",          ipa: "ʃɹoˈkwiːx",   synth: "ʃɹoˈkwiːx",   audio: "audio/stage4/dragon_05_shrokwiix.wav" },
      { id: 51, english: "hover",         ipa: "kwiˈʃɹiː.ʔal", synth: "kwiˈʃɹiːʔal", audio: "audio/stage4/dragon_06_kwishriial.wav" },
      { id: 52, english: "roast",         ipa: "θɹuˈglaːʔ",   synth: "θɹuˈglaːʔ",   audio: "audio/stage4/dragon_07_thruglaa.wav" },
      { id: 53, english: "wisdom",        ipa: "ˈkwiː.xɹetʃ",  synth: "ˈkwiːxɹetʃ",  audio: "audio/stage4/dragon_08_kwiixretsh.wav" },
      { id: 54, english: "mate",          ipa: "ˈtɹaː.ʒuŋ",   synth: "ˈtɹaːʒuŋ",   audio: "audio/stage4/dragon_09_traazhung.wav" },
      { id: 55, english: "treasure",      ipa: "ˈglaːʔ.ʃwon",  synth: "ˈglaːʔʃwon",  audio: "audio/stage4/dragon_10_glaashwon.wav" },
      { id: 56, english: "loop the loop", ipa: "kwiˈʒoʔ.lex",  synth: "kwiˈʒoʔlex",  audio: "audio/stage4/dragon_11_kwizholex.wav" },
      { id: 57, english: "obedience",     ipa: "kɹuˈθaː.ʒel",  synth: "kɹuˈθaːʒel",  audio: "audio/stage4/dragon_12_kruthaazhel.wav" },
      { id: 58, english: "discipline",    ipa: "dɹeˈxɹiːŋ",   synth: "dɹeˈxɹiːŋ",   audio: "audio/stage4/dragon_13_drexriing.wav" },
      { id: 59, english: "snooze",        ipa: "ˈðɹuʔ.loŋ",   synth: "ˈðɹuʔloŋ",   audio: "audio/stage4/dragon_14_dhrulong.wav" },
      { id: 60, english: "bond",          ipa: "xwaˈdʒiː.ʔoŋ", synth: "xwaˈdʒiːʔoŋ", audio: "audio/stage4/dragon_15_xwadzhiiong.wav" }
    ]
  }
};

const IPA_KEYS = [
  { symbol: "t",  shortcut: "t", row: "stops", stage: 1, file: "ta.wav" },
  { symbol: "d",  shortcut: "d", row: "stops", stage: 1, file: "da.wav" },
  { symbol: "k",  shortcut: "k", row: "stops", stage: 1, file: "ka.wav" },
  { symbol: "g",  shortcut: "g", row: "stops", stage: 1, file: "ga.wav" },
  { symbol: "ʔ",  shortcut: "?", row: "stops", stage: 3, file: "a_glottal_a.wav" },
  { symbol: "tʃ", shortcut: "C", row: "stops", stage: 2, file: "tsha.wav" },
  { symbol: "dʒ", shortcut: "J", row: "stops", stage: 2, file: "dzha.wav" },
  { symbol: "n",  shortcut: "n", row: "stops", stage: 1, file: "na.wav" },
  { symbol: "ŋ",  shortcut: "N", row: "stops", stage: 2, file: "ang.wav" },

  { symbol: "θ",  shortcut: "T", row: "fricatives", stage: 3, file: "tha.wav" },
  { symbol: "ð",  shortcut: "D", row: "fricatives", stage: 3, file: "dha.wav" },
  { symbol: "s",  shortcut: "s", row: "fricatives", stage: 1, file: "sa.wav" },
  { symbol: "z",  shortcut: "z", row: "fricatives", stage: 3, file: "za.wav" },
  { symbol: "ʃ",  shortcut: "S", row: "fricatives", stage: 2, file: "sha.wav" },
  { symbol: "ʒ",  shortcut: "Z", row: "fricatives", stage: 2, file: "zha.wav" },
  { symbol: "x",  shortcut: "x", row: "fricatives", stage: 3, file: "xa.wav" },
  { symbol: "h",  shortcut: "h", row: "fricatives", stage: 1, file: "ha.wav" },
  { symbol: "l",  shortcut: "l", row: "fricatives", stage: 1, file: "la.wav" },
  { symbol: "ɹ",  shortcut: "r", row: "fricatives", stage: 2, file: "ra.wav" },
  { symbol: "j",  shortcut: "j", row: "fricatives", stage: 2, file: "ja.wav" },
  { symbol: "w",  shortcut: "w", row: "fricatives", stage: 1, file: "wa.wav" },

  { symbol: "i",  shortcut: "i", row: "vowels", stage: 1, file: "i.wav" },
  { symbol: "e",  shortcut: "e", row: "vowels", stage: 1, file: "e.wav" },
  { symbol: "a",  shortcut: "a", row: "vowels", stage: 1, file: "a.wav" },
  { symbol: "o",  shortcut: "o", row: "vowels", stage: 1, file: "o.wav" },
  { symbol: "u",  shortcut: "u", row: "vowels", stage: 1, file: "u.wav" },
  { symbol: "ˈ",  shortcut: "'", row: "vowels", stage: 1, file: null },
  { symbol: "ː",  shortcut: ":", row: "vowels", stage: 3, file: null }
];