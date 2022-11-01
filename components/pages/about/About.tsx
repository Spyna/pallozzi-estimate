import ReactMarkdown from "react-markdown";

export default function About() {
  return (
    <div className="container mx-auto p-4 pt-12 ">
      <div className="prose lg:prose-xl dark:prose-invert">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}

const markdown: any = `

# Pallozzi Estimate

> **Pallozzi estimate** is a web application that helps software developers and project managers estimate things that need to be developed



## Motivation

The biggest problem in making estimates is that these are precisely: estimates. That is, they are not a definite number of days but are a more or less approximate estimate by their very nature. 

The problem becomes even more significant when developers have to estimate something they do not know. 

What we unconsciously do when we have to give an estimate is associate the task we have to estimate with something we have already done. Based on our experience, we provide a similar number for the job we have already developed. 

The problem with doing this is that sometimes this assessment can be subjective. So how can this problem be solved? 

The basic idea of the Pallozzi estimate is straightforward: you find all the data and actors involved in a task and associate a "weight" with each one. The data can be of three types:
* Reading: 1 point weight
* Updating: 3-point weight
* Writing: 5-point weight


You can obtain the estimate in days using this formula: 
\`\`\`
estimate = 
<number of actors> * 
( <number of reads> * 1 + <number of updates> * 3 + <number of writes> * 5) *
<multiplier>
\`\`\`

The multiplier is a constant that we have identified, and it is: 1.8

For example, if we need to estimate this task: 
We need to send an invoice to the customer

We identify:
* actor: Administrator
* data element: Invoice (read, write, updates)
* data element: Finance (read)
* data element: Suppliers (read)

So, according to our formula, we will have the following: 

\`\`\`
estimate = 1 * (3 * 1 + 1 * 3 + 1 * 5) * 1.8 = 19.8 days
\`\`\`


## Contribute

Contribution on this project are welcome. The source code is on github [https://github.com/Spyna/pallozzi-estimate.git](https://github.com/Spyna/pallozzi-estimate.git).

`;
