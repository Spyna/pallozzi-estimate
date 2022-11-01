# Pallozzi Estimate

> *Pallozzi estimate* is an application that helps software developers and project managers estimate things that need to be developed

## Motivation

The biggest problem in making estimates is that these are precisely: estimates. That is, they are not a definite number of days but are a more or less approximate estimate by their very nature. 

The problem becomes even more significant when developers have to estimate something they do not know. 

What we unconsciously do when we have to give an estimate is to associate the task we have to estimate with something we have already done. Based on our experience, we try to give a similar number to the job we have already developed. 

The problem with doing this is that sometimes this assessment can be subjective. So how can this problem be solved? 

The basic idea of the Pallozzi estimate is straightforward: you find all the data and actors involved in a task and associate a "weight" with each one. The data can be of three types:
* Reading: 1 point weight
* Updating: 3 point weight
* Writing: 5 point weight

The task estimate is obtained using this formula: 
```
estimate = 
<number of actor> * 
( <number of reads> * 1 + <number of updates> * 3 + <number of writes> * 5) *
<multiplier>
```

Multiplier is a constant that we have identified, and it is: 1.8

For example, if we need to estimate this task: 
We need to send an invoice to the customer

We identify:
  * actor: Administrator
  * data element: Invoice (read, write, updates)
  * data element: Finance (read)
  * data element: Suppliers (read)

So, according to our formula, we will have the: 

```

estimate = 1 * (3 * 1 + 1 * 3 + 1 * 5) * 1.8 = 19.8 days

```

## Contribute 

Contribution on this project are welcome. 

This project is developed using Next.js, to run it locally: 

```
git clone https://github.com/Spyna/pallozzi-estimate.git
cd pallozzi-estimate
npm install
# yarn 

npm run dev
# yarn dev

```

