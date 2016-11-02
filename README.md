# ProcJam Workshop at Kër Thiossane

ProcJam (short for procedural jam) is an international "game jam" where people make things that make things. These things can be software that generates images, stories, or game levels. They could also be physical projects, such as a board game with dynamic layout, a wind chime (thing that makes music), or a set of rules for how to draw something. We will meet on two days to participate in ProcJam and share ideas with each other and the wider ProcJam community.

On Friday, we will get into the spirit of ProcJam through a series of exercises and examples demonstrating techniques for procedurally generating drawings. We will make drawings first by hand on paper, then we will see how to make similar drawings in a web browser using the javascript programming language.

On Saturday, we will produce our own procedural projects. Come in with an idea to make yourself or work with others to realize a procedural project. People with knowledge of design and javascript will be on hand to help out with project conceptualization and realisation.

Through participating in ProcJam, you will learn the basics of writing code in javascript as well as some modern design fundamentals.

David Wicks is an American artist and software developer. Their work focuses on data and the environment. David has realised large-scale installations for IBM, Twitter, and others across the United States. David speaks English and German, and currently can greet you in French.

## Friday Syllabus

### Welcome

Welcome to the ProcJam session. My name is David Wicks.

We will explore procedural content generation today and tomorrow. Procedural content generation means that we will create processes that allow us to create something else in a fun or efficient way. These procesesses are things that make things.

In order to explore procedural content generation, we will do some exercises by hand, then see how they can be translated to processes that the computer can do for us. The work we will do involves both design thought (what do we want to make), and technical thought (how do we go about making it).

### Examples/Inspiration

First, let’s look at some examples of procedural content generation. As you can see, a lot of these processes are data-driven. Procedural content can respond to people’s input to be more interesting/relevant/challenging for them.

[It's Doing It](itsdoing.it)
_It’s doing it_ is an exhibition of procedural works organized by a colleague. Each of the pieces generated a new image every day for a month.
[Written Images]()
_Written Images_ is a generative book: each copy of the printed book is unique, with image spreads generated from procedural software written by a number of different artists.
[Wave Function Collapse Paper]()
A recent technique that is in the PCG news is wave function collapse. It allows you to create large areas of seamless content that looks similar to an input image.
[Wave Function Collapse Web Sample](http://www.kchapelier.com/wfc-example/overlapping-model.html)
You can play with a web implementation of WFC here.
[Spelunky]() /level design document?/
_Spelunky_ is a successful video game that uses procedural content generation to create unique levels every time someone plays it.
[The Annals of the Parrigues]()
_The Annals of the Parrigues_ is a short story written using procedural content generation to create a set of related imaginary places and written descriptions of each place.
[Reas Process]()
Casey Reas has a series of work called “Process” that consist of a set of simple rules executed by software to make continuously-evolving drawings. These processes are defined by a set of drawn “elements” that have a “behavior” they follow on screen.

### Conditional Design

#### Introduction (15 minutes)
Conditional Design is an ongoing design project started in 2008 by Luna Maurer, Edo Paulus, Jonathan Puckey, and Roel Wouters. They wrote a manifesto describing the way they wanted to work in response to how much of network culture is dynamic and data-driven. Out of those ideas, they have made design objects and led workshops similar to what we are doing here.

Sa manifesto a /scriber/ en Anglais, donc j'ai /translatee/ un peu pour aujourd'hui. Vous pouvez voir le manifesto complete a [son website](http://conditionaldesign.org/manifesto).

From their manifesto:
> Our work focuses on processes rather than products:
> things that adapt to their environment,
> emphasize change and show difference.

So, let's make some drawings by following processes inspired by the conditional design manifesto. They are often surprisingly interesting even when derived from very few rules.

We will follow three different rule sets. Once you have the rules, feel free to follow them as many times as you like. We will spend about 15 minutes on each process.

#### Process I: Multiply (15 minutes)
1) Draw a line
2) From the end of the line, draw two more lines
3) Repeat step 2 with each line you draw

#### Process II: Forest growth (15 minutes)
In a group of at least 2 people:
Setup:
1) Each person makes a mark on the paper
2) The distance from your starting mark to the next person's starting mark is your maximum distance.
Take turns placing new marks on the paper:
- Each new mark of yours can be no farther than your maximum distance from your previous mark.
- Stop when you feel like it, or when your next mark could be placed off the page.

#### Process III: Follow (15 minutes)
This last exercise came out of a past conditional design workshop.
In a group of at least 3 people:
1) Everyone should place their pen on the paper at the same time.
2) Copy the drawing of the person on your left.

## Saturday Welcome

### Welcome back.
Hello.
15 Write down or sketch an idea on paper.
15 Share your idea with the person sitting next to you.
30 One of you presents both ideas.
15 Form groups.

### Working time.
3h

### Present projects at end of day.
1h

## Project notes, things to do…

Conditional Drawing workshop.
Implement sample rulesets in javascript (tarbell cities, beach sitting—tree growth, fungal growth, beach sitting with umbrella and towel, "book nodes", tree branching).

[Conditional Design](https://www.conditionaldesign.org/)
[Physical Character Creator](https://www.youtube.com/watch?v=3YDgu0A9zp4)
https://github.com/kchapelier/wavefunctioncollapse

[Référence JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference)

