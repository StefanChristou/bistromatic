<script>
  import Figure from "../shared/Figure.svelte";
  import PageHeading from "../shared/PageHeading.svelte";
  import Subheading from "../shared/Subheading.svelte";
  import Paragraph from "../shared/Paragraph.svelte";
</script>

<PageHeading>Q+A with the author</PageHeading>

<Figure
    src="images/mountains-in-clouds.jpg"
    alt="Photograph of mountains in clouds as seen from the air"
    caption="Mountains in clouds, Italy. © Stefan Christou 2017"
/>

<section>
  <Subheading>ASL?</Subheading>
  <Paragraph>My name is Stefan and I'm a software engineer. I bounce around between Hackney in east London, Thailand and
    Berlin.</Paragraph>

  <Subheading>What do you do for a living?</Subheading>
  <Paragraph>I build web applications and data visualisations. Sometimes I bring in other devs to make small teams to deliver
    for clients.</Paragraph>

  <Subheading>Is that it?</Subheading>
  <Paragraph>I also do some design and UX work. I have UX training from <a
      href="https://en.wikipedia.org/wiki/Bruce_Tognazzini">Tog</a> at <a href="https://www.nngroup.com/">Neilson Norman
    Group</a> and used to work in journalism as a producer back in the day for TV and radio. My first full-time tech job
    was designing and building fancy banner ads for <a href="https://www.inskinmedia.com/">InSkin</a>. I have also
    lectured at university level including leading the delivery of Contextual Studies units at <a
        href="https://www.ravensbourne.ac.uk/">Ravensbourne</a>.</Paragraph>

  <aside>You want me to say 42 don't <span class="last-word-in-aside">you?</span></aside>

  <Subheading>What technology do you use?</Subheading>
  <Paragraph>I work in Angular, React, Svelte, .NET, Node, sql, nosql and other things. For stand alone data-visualisations I
    tend to use Svelte because of how quickly it is able to work with large numbers of DOM elements. I tend to do a lot
    of custom SVG work and lots of data pre-processing in JS. For hosting I currently favor AWS Amplify due to its
    scalability and ease of CI/CD setup, but I have used Azure extensively including AD/B2C and have dabbled in Firebase
    also.</Paragraph>

  <Subheading>What's your split between front and back end?</Subheading>
  <Paragraph>I am most senior in the front end, but I have built complex data-driven full stack applications that can swiftly
    handle millions of rows of data.</Paragraph>

  <Subheading>Management experience?</Subheading>
  <Paragraph>I have lead front end teams, including multiple outsourced teams. I have lead delivery of university courses with
    multiple other lecturers working with me. I have managed and trained radio DJs. I sometimes form small outsourced
    teams for clients.</Paragraph>

  <Subheading>We work with Agile and do some flavor of <span class="scrum">SCRUM</span>. Do you know what that is?</Subheading>
  <Paragraph>I have a healthy knowledge of Agile and know when it is and isn't appropriate for an organisation. Foregoing <span
      class="scrum">SCRUM</span>
    mainly hinges on how appropriate it is for teams to bring agency to a project. In practice that means that if you
    use outsourced teams, are a tech agency delivering for outside clients, or your core business is something other
    than "technology", then use Agile <span class="scrum">SCRUM</span>. If you
    are first and foremost a technology company then it's possible that Agile and <span class="scrum">SCRUM</span> might
    serve to silo your teams
    away from each other, from customers and stakeholders, and limit their ability to perform to the best of their
    abilities. <span class="scrum">SCRUM</span> can be very useful, but should be assessed based on the goals, structure
    and working styles of an organisation.</Paragraph>

  <Subheading>Errrr, yeahhhh. So... do you like other things?</Subheading>
  <Paragraph>I'm interested in art and technology. Like a lot of programmers I read more science than I understand. I enjoy
    prototyping nonsense experiences on the web. I like cycling and hiking. I like thinking about people and the things
    we collectively go through as societies, that kind of boring stuff.</Paragraph>

  <Subheading>You're really loosing me. Can I just look at your insta or twitter or something?</Subheading>
  <Paragraph>I'm not really interested in social media so I won't have any interesting accounts to look at. I have <a
      href="https://www.linkedin.com/in/stefan-christou-b1b1156a/">linkedin</a> and <a
      href="https://github.com/StefanChristou">github</a>.</Paragraph>

  <Subheading>I've noticed the git repo for this site is called Bistromatic. How many code names did you have to go
    through before choosing that one?</Subheading>
  <Paragraph>You want me to say 42 don't you?</Paragraph>

  <Subheading>Would you like to give a shout out to anyone?</Subheading>
  <Paragraph>My art heroes are Marcel Duchamp, Richard Hamilton and Martin Creed. Also my wife Pariya who is an awesome branding
    designer.</Paragraph>

  <Subheading>One last thing... Why is the UX on this website so weird?</Subheading>
  <Paragraph>Why are YOU so weird???</Paragraph>
</section>

<style>
  section {
    max-width: 700px;
  }

  aside {
    font-style: italic;
    margin-top: 1rem;
    margin-left: 2.5rem;
    font-weight: 700;
    font-size: 2rem;
    float: right;
    max-width: 250px;
    position: relative;
    line-height: 1.3;
    transform: translateY(-1rem);
  }

  aside:before {
    content: '"';
    position: absolute;
    top: -1rem;
    left: -2.5rem;
    font-family: cursive;
    font-size: 4rem;
  }

  .last-word-in-aside {
    display: inline-block;
    position: relative;
  }

  .last-word-in-aside:after {
    content: '\201D';
    position: absolute;
    top: -0.9rem;
    right: -1.2rem;
    font-size: 4rem;
    font-family: cursive;
  }

  .scrum {
    font-variant: small-caps;
    font-size: 0.85em;
  }
</style>