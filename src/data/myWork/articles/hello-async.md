## A Foray Into The Unknown
The goal of [HelloAsync](https://www.helloasync.com "HelloAsync - The intuitive async solution for busy professionals") is to leverage asynchronous video to improve the way businesses communicate with customers. For every online business, the customer journey is almost totally asynchronous, with the occasional synchronous and personal touch along the way. I believe that this approach can be improved, adding a more personal journey for ideal customers without totally sacrificing efficiency.

***

## PSEO
To market the tool, I decided to test out my ability to use [Programmatic SEO](https://www.semrush.com/blog/programmatic-seo/ "Semrush article on the advantages of Programmatic SEO"). This proved to be fruitful, as I was able to create the marketing site with 155 various pages in the short time it took me to compile the data I needed. Primarily, this was a quick scrape of the various features that other tools in the space had and some additional features I thought would be useful.

### How I Built It
Since I was aiming for speed and simplicity, I decided to use an [SQLite database](https://www.sqlite.org/ "SQLite is a version of SQL that I was fine storing in my actual project because it takes up very little space but doesn't sacrifice performance to do so") embedded within the project to store the data I gathered. This is definitely not ideal for most projects, but my dataset was pretty small and I'm the only developer on this project so there aren't any concerns for others writing content or updating the dataset.

In the future, and with other PSEO projects, my preferred approach for data would be to use a better data store, like [PostgreSQL](https://www.postgresql.org/ "I like PostgreSQL") (for more relational data) or [MongoDB](https://www.mongodb.com/ "I'm a Javascript dev - of course I really like MongoDB") (for more mutable data), as well as a CMS, preferably [Strapi](https://strapi.io/ "Strapi is an amazing project that goes beyond your wildest CMS related dreams"), to manage templates and make minor adjustments to the content. These would function as layers like so:

- An overall content type creates a basic shape for the content, like a blog article or comparison page.
- A template is layered on top of the content type to give more structure to the page. Templates can be improved using [spintax](https://support.saleshandy.com/article/345-what-is-spintax-and-how-to-use-it "Spintax is a way to add dynamic content to your text") to add dynamic content to the text.
- Data is then layered on the template to fill in the gaps that were left behind.

![My ideal way to visualize data for a block of programmatic content.](/hello-async/ideal-pseo-structure.svg "My ideal way to visualize data for a block of programmatic content.")

On the front end and back end, I used Next.js. This wasn't just the simple choice in my opinion, it was the ideal choice. Dynamic routes in Next.js are a perfect choice for PSEO, both on the front end and back end. Having dynamic API routes that correspond exactly to the page structure on the frontend made calling and formatting data a breeze, not to mention that taking advantage of server side rendering in a React app is the perfect way to have a dynamic page that is still fast for the reader.

After seeing the programming woes that others had to go through with spreadsheets and Wordpress to create their PSEO projects, I was happy with the "more complicated" choice of Next.js and a real (lite) database in SQLite.

### Features Pages
My list of features was the basis for every piece of SEO content on the site. For instance, there are **119 unique features** I identified across **16 different tools**. These make up the [features directory](https://www.helloasync.com/features/ "The list of features I compiled for async tools") and [subsequent pages](https://www.helloasync.com/features/workflows "Here is an example feature page for the Workflow feature").

![The HelloAsync features directory. Each of these features has a subsequent definition page or article.](/hello-async/hello-async-features-page.png "The HelloAsync features directory. Each of these features has a subsequent definition page or article.")

Each feature page had a short description of what functionality a user could expect, as well as the stage of development for my tool. Planned or implemented features have a widget that would let the user get a closer look at how the feature was implemented in the app.

![The HelloAsync feature preview widget. This allowed users to get a more hands on feel for the app before joining our beta waitlist.](/hello-async/hello-async-feature-preview.png "The HelloAsync feature preview widget. This allowed users to get a more hands on feel for the app before joining our beta waitlist.")

### Competitor Pages
Another PSEO page that's low hanging fruit is the **Company A vs Company B** comparison page, or [competitor page](https://www.helloasync.com/compare/helloasync-vs-loom "An example comparing HelloAsync and Loom"). Combining the previous list of features with a list of other companies in the space, I was able to create a comparison of every tool on the list, all with a helpful table to quickly find the features that were most important to the user. This data also proved to be especially useful in creating an overview of [each competitor](https://www.helloasync.com/compare/ "The (partial) list of competitors in the space") to be used in conjunction with the feature table.

![How HelloAsync holds up to the competition. Helpful articles to find the best async solution for the reader.](/hello-async/hello-async-feature-comparison.png "How HelloAsync holds up to the competition. Helpful articles to find the best async solution for the reader.")

### Pricing Page
The last piece of low hanging fruit in the PSEO pie, at least when it comes to my aggregate features data, was a [pricing page](https://www.helloasync.com/pricing/ "The HelloAsync pricing page") that laid out our plans for which features a user could expect at which price points. Again, this was all built using the same dataset of features across all competitors that existed in the space.

![The HelloAsync pricing table. Fully transparent and SEO friendly.](/hello-async/hello-async-pricing-table.png "The HelloAsync pricing table. Fully transparent and SEO friendly.")

***

## The Actual Project

Currently, the actual async tool itself is on the backburner. But here are the features I've completed work on:

1. An embeddable widget that allows a sites customers to communicate asynchronously with the company, all without an account.
2. Workflows that can be custom built by the company to funnel their customers based on their own criteria.

It isn't complete at the moment, but it's something I'm looking forward to working on in the future as I find more demand for the product.