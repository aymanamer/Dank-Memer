<p align="center">
<a title="memes" href=""><img src="https://cdn.discordapp.com/attachments/340306589036838922/340320643830644736/Dankbg.jpg"></a>
</p>
<p align="center">
  <a title="discordbots.org is a shitty list" href="https://bots.discord.pw/">
  <img src="https://discordbots.org/api/widget/servers/270904126974590976.png" alt="discordbots.org is a shitty list" />
</a>
  <a title="Travis" href="https://travis-ci.org/melmsie/Dank-Memer"><img src="https://travis-ci.org/melmsie/Dank-Memer.svg?branch=master"></a>
  <a title="BotVersion" href="https://github.com/melmsie/Dank-Memer/releases"><img src="https://img.shields.io/github/release/melmsie/Dank-Memer.svg"></a> 
  <a title="Version" href=""><img src="https://img.shields.io/badge/node.js-8.2.1-brightgreen.svg"></a>
  <a title="Codacy Badge" href="https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=melmsie/Dank-Memer&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/83c15be03279409c9ac3ab3979cb3d23"></a>
</p>

A discord bot made primarily with Node.js and Eris, with plans to constantly add commands and grow to new platforms.

## Getting Started

These instructions will get you started using the bot and making sure it is set up well on your server. If you are having issues with the bot, be sure to check over these steps again or join the support server.

### Prerequisites

To add the bot to your server, you need to meet at least one of the following requirements:

* Be the owner of the server
* Have "Manage Server" permission on the server

For the bot to work properly, it will need all of the permissions seen in the below image.

![Server Permissions](http://i.imgur.com/9fkAFyN.png "Permissions Needed")

You can [click here](https://goo.gl/ktrEbN) for an invite that has these permissions pre-selected for you.

### Using the bot

The prefix to use the bot is `pls` *Example: pls ping*. No, not `!`, `?`, or `-` like most bots. Prefixes don't have to be a common symbol!

To get the full command list, you can do `pls help`.

![pls help example](http://i.imgur.com/nMcOsHM.gif "Help me Melmsiwan-Kenobi, you're my only hope!")

All commands use the same prefix, and are updated constantly!

If you need any more help with anything, join [this server](https://discord.gg/3GNMJBG)!

## Dependencies

Dank Memer requires the following dependencies (in no order):

- Node and NPM
- RethinkDB
- Gyp build tool (gyp)
- Libtool
- Freetype & it's headers (libfreetype6-dev)
- Cairo & it's headers (libcairo2-dev)

### Installing dependencies

- Install Node JS (8+) and Npm
    - Maybe by following [here](https://nodejs.org/en/download/package-manager/)
- Install RethinkDB
    - Maybe by following [here](https://www.rethinkdb.com/docs/install/ubuntu/)

As root:

```
apt-get install \
  libfreetype6-dev \
  libcairo2-dev \
  libsodium-dev \
  libtool
```

## Building

After installing the dependencies...

`npm install`

## Example config

Must be placed in the "`src`" directory.
Refer to `example-config.json`.

## Running

Make sure that RethinkDB is listening on it's default port `28015`.

Change directory to "`src`" then:

`node memer.js`

## Built With

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The language
* [Node](https://nodejs.org/en/) - The runtime
* [Eris](https://abal.moe/Eris) - The Library
* [RethinkDB](https://www.rethinkdb.com) - The database

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/melmsie/8bc44dbcbb7781a45ba1fbabbd617f1b) for details on our code style, and how not to trigger us.

## Authors

* **Melmsie** - *Initial work and owner* - [GitHub Profile](https://github.com/melmsie)
* **Aetheryx** - *I like trains* - [GitHub Profile](https://github.com/Aetheryx)

See also the list of [contributors](https://github.com/melmsie/Dank-Memer/contributors) who participated in this project.

## License

This project is licensed under the GNU AGPLv3 License - see the [LICENSE.md](LICENSE.md) file for exact details, but basically if you take my work, give me credit. You also need to have your application that uses my code under the same license.

## Acknowledgments

* **Stupid Cat** - *Original author of trigger.js* - [GitHub Profile](https://github.com/Ratismal)
* **Samoxive** - *Help with debugging stupid node errors and learning js* - [GitHub Profile](https://github.com/Samoxive)
* **Kodehawa** - *Emotional support when dealing with stupid issues and users* - [GitHub Profile](https://github.com/Kodehawa)
* **LoverofSporks#2433** - *Went through 800 meme templates to give everyone a better experience <3* 
