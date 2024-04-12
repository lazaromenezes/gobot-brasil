import Command from '../../classes/Command.js'
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'

const steamTags = [
    'Adventure',
    'Casual',
    'Strategy',
    'Simulation',
    'RPG',
    'Sports',
    'Racing',
    'Multiplayer',
    'Atmospheric',
    'Puzzle',
    'Horror',
    'Open World',
    'Sci-fi',
    'Shooter',
    'Fantasy',
    'Story Rich',
    'FPS',
    'Platformer',
    'First-Person',
    'Female Protagonist',
    'Funny',
    'Sandbox',
    'Gore',
    'Comedy',
    'Survival',
    'Violent',
    'Point & Click',
    'Arcade',
    'Third Person',
    'Retro',
    'Turn-Based',
    'Nudity',
    'Zombies',
    'Exploration',
    'Space',
    'Tactical',
    'Psychological Horror',
    'Shoot \'Em Up\'',
    'RTS',
    'Survival Horror',
    'Stealth',
    'Turn-Based Strategy',
    'Dark',
    'Mystery',
    'Building',
    'Crafting',
    'Historical',
    'RPGMaker',
    'Fast-Paced',
    'Third-Person Shooter',
    'War',
    'Action-Adventure',
    'Hack and Slash',
    'Moddable',
    'Puzzle-Platformer',
    'Post-apocalyptic',
    'Side Scroller',
    'Fighting',
    'Tower Defense',
    'Character Customization',
    'Management',
    'Bullet Hell',
    'Dating Sim',
    'Competitive',
    'World War II',
    'Beat \'em up',
    'Medieval',
    'Relaxing',
    'Dark Fantasy',
    'Futuristic',
    'Drama',
    'Crime',
    'Military',
    'Cyberpunk',
    'Choices Matter',
    'Robots',
    'Parkour',
    'Magic',
    'Aliens',
    'Driving',
    'Surreal',
    'Romance',
    'Metroidvania',
    'Perma-death',
    'Thriller',
    'City Builder',
    'Base Building',
    'Trains',
    'Card Game',
    'Steampunk',
    'Grand Strategy',
    'Turn-Based Combat',
    'Twin Stick Shooter',
    'Flight',
    'Top-Down Shooter',
    'Dark Humor',
    'Multiple Endings',
    'Economy',
    'Turn-Based Tactics',
    'Detective',
    'Destruction',
    'Arena Shooter',
    'Dystopian',
    'Resource Management',
    'Space Sim',
    'Interactive Fiction',
    'Match 3',
    'Ninja',
    'Mechs',
    'Cartoon',
    'Psychological',
    'Pirates',
    'Noir',
    'Wargame',
    'Dinosaurs',
    'Superhero',
    'Assassin',
    'Linear',
    'Hacking',
    'Real-Time',
    'Strategy RPG',
    'Supernatural',
    'e-sports',
    'Tanks',
    'God Game',
    'Hunting',
    'Naval',
    'Satire',
    'Psychedelic',
    'Tactical RPG',
    'Western',
    'Science',
    'Vampire',
    'Swordplay',
    'Score Attack',
    'Hex Grid',
    'Gothic',
    'Real Time Tactics',
    'Time Travel',
    'Villain Protagonist',
    'Parody',
    'Politics',
    'Heist',
    'Cold War',
    'Political',
    'Underwater',
    'Dark Comedy',
    'Clicker',
    'Martial Arts',
    'Sniper',
    'Silent Protagonist',
    'Runner',
    'Agriculture',
    'Grid-Based Movement ',
    'Modern',
    'Rome',
    'Programming',
    'Conspiracy',
    'Spectacle fighter',
    'Mythology',
    'Mining',
    'Offroad',
    'Time Manipulation',
    'Fishing',
    'Mars',
    'Sailing',
    'Gambling',
    'Diplomacy',
    'Word Game',
    'Philisophical',
    'Capitalism',
    'Nonlinear',
    'Sokoban',
    'Lemmings',
    'Underground',
    'Golf',
    'Transhumanism',
    'Intentionally Awkward Control\'s',
    'Non Violent'
];
const genreTags = [
    'Rogue',
    'RPG',
    'Platform',
    'Shooter',
    'Fighting',
    'Stealth',
    'Survival',
    'Text Adventure',
    'Tactical',
    'SandBox',
    'Simulation',
    'RTS',
    'RTT',
    'Tower Defense',
    'Turn Based Strategy',
    'Turn Based Tactical',
    'Wargame',
    'Sports',
    'Competetive',
    'Puzzle',
    'Trivia',
    'Card Game',
    'Programming'
];

function getRandomArrayIndex(array) {
    return Math.floor(Math.random() * array.length);
};

class GameIdeaGenerator extends Command {
    constructor(client) {
        super(client, new SlashCommandBuilder()
            .setName('geradordeideias')
            .setDescription("retorna uma ideia aleatória de game utilizando as tags da steam")
        )
    }
    async run(interaction, client) {
        let genreOne = getRandomArrayIndex(genreTags);
        let genreTwo = getRandomArrayIndex(genreTags);
        let tag = getRandomArrayIndex(steamTags);

        while (genreOne == genreTwo) {
            genreTwo = getRandomArrayIndex(genreTags);
        }
        while (genreTwo == tag) {
            tag = getRandomArrayIndex(steamTags);
        }

        const embed = new EmbedBuilder()
            .setTitle("O estilo do jogo é:")
            .setColor("#2596be")
            .setDescription(`**${genreTags[genreOne]}**\n**${genreTags[genreTwo]}**\n**${steamTags[tag]}**`);

        interaction.reply({ embeds: [embed] })
    }
}

export default GameIdeaGenerator