<h1 align="center">Education Typescript</h1>
<p align="center">
  <i>Implementazione di un sistema Education in Typescript</i>
  <br/><br/>
  <img width="400" alt="Lavagna" src="https://github.com/FrancescoCt/francescoct.github.io/blob/master/assets/img/lavagna.jpg"/>
  <br/><br/>
  <b><a href="#features">Features</a></b> | <b><a href="#getting-started">How it works</a></b> | <b><a href="https://francescoct.github.io/">About me</a></b>
  <br/><br/>
  <a href="https://github.com/FrancescoCt/EducationTypescript/blob/main/CHANGELOG.md"><img src="https://img.shields.io/badge/version-0.1-blue" alt="Current Version"/></a>
  <a target="_blank" href="https://github.com/FrancescoCt/EducationTypescript"><img src="https://img.shields.io/github/last-commit/francescoct/educationtypescript?logo=github&color=609966&logoColor=fff" alt="Last commit"/></a>
</p>
<br/><br/>

<details>
  <summary><b>Table of Contents</b></summary>

* [Features](#-features)
* [How it works](#-how-it-works)
* [How to test it](#-how-to-test-it)
* [Code](#-code)
* [Credits](#-credits)
  * [Contributors](#contributors)
</details>

<h2 id="features">🎯 Features</h2> 

* 🔍 **Custom types**. Use of custom Typescript custom types.
* 📒 **Custom functions**. Use of global functions and methods to create objects/do things.
* 😎 **Interfaces**. Use of IPartecipante, ICorso, IAzienda.
* 📱**Classes**. Use of Partecipante, Corso, Azienda.
* 🚔 **Tested**. CodePen, Nodejs <br/>
* 💻 **Languages**. Typescript <br/>

<h2 id="getting-started">🔍 How it works</h2>
<p>Just run the program online with CodePen or use locally the commands: <br/>
  <code>tsc education.ts</code><br/>
  <code>node education.js</code><br/>
  The program will show some of the use cases involved with the creation/management of objects. 
</p>
<p>The main program tests the following cases:</p>
  
* Creation of environment to work on
* A Azienda try to offer Partecipante a job while he's not formed yet (he is not on the formed Partecipants list yet) -> BusinessLogicException
* Some Partecipantes submit subscription to one of the courses (Corso) offered
* One of the Aziendas decides to get the list of formed Partecipante again and offers two jobs applications to two Partecipantes


## 💻 How to test it

* Download the current repository and test it on localhost or try it online. Here is the [link to CodePen]([https://francescoct.github.io/projects/hackerNews/dist/](https://codepen.io/Francesco-Catania/pen/ExqmMdX)).
