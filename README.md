# Project Managed app

* !!! Work In Progress
* live demo <a href="https://project-managed-app.vercel.app/" target="_blank" rel="noopener">here</a>

To log in as a guest: 

email: user@email.com
password: password

## Introduction

A full stack project management app built with Next.js, Typescript and Sass.


## 🗝️ Features

* Built with Next.js 13's new feature "app" directory
* Auth
  * User can sign in/register using their email address and password
    * Hash and compare passwords using bcrypt
    * Use JWT to save and access cookies for session management by utilising middleware in the edge runtime
* Dashboard 
  * User can check their projects
  * User is directed to project's detail page when clicking the project card
    * User can create new task
    * User can click each task to see details and edit/delete task
    * User can delete the project
  * User can check their tasks by status in status page
* Use Sass modules throuout the app
* Use Sass mixins and variables for reusable styles
* Completely responsive 🙌(Mobile first approach)

## 🔍 Why I chose what I chose ?
1. Next.js
  * Allows building and deploying full-stack apps without separate server-side code.
2. TypeScript
  * Enables writing more precise code with enhanced type checking.
  * Provides better error handling and auto completion, which benefits code quality and developer productivity.
3. SCSS(Sass)
  * Provides advanced CSS features like mixins and functions for easy style control and manipulation.
  * Offers a powerful CSS writing experience.
4. Prisma
  * Simplifies database setup with its existing schema.
  * Has easy integration and management of database.
5. JWT with edge runtime's cookies
  * Allows more specific control over session management.
  * Uses industry-standard authentication mechanism which is compatible with many frameworks.
  * Learning opportunity - I wanted to gain a deeper understanding of the underlying authentication mechanisms and security concepts.
  * Offers full controll over token generation, validation, and expiration.
6. Middleware
  * Enables intercepting and processing requests in a centralized manner.
  * Retrieve, validates and verifies JWT


## 📀 Database Schema
![schema](./public/schema-diagram.png)

## 📸 Screenshots
<img src="https://imgur.com/WmVKOXb.jpg" width="350" height="auto">

## 🛠️ Tech Stack
![techStack](./public/techstack.png)

## ⏱️ Dependencies
* Prisma
* Bcrypt
* React-feather
* Jose


##  🌪️ Troubleshooting

###  Error: Warning when accessing Date object within client components

**Error Message**

```
Warning: Only plain objects can be passed to Client Components from Server Components. Date objects are not supported.
{id: ..., createdAt: Date, updatedAt: ..., ownerId: ..., projectId: ..., status: ..., name: ..., description: ..., due: ..., deleted: ...}
```

**Problem**

When passing the data from server component to client component through props, the data is serialized for use in browser.

**Solution**

To deserialize, I changed the getData function in server component.

```ts
const getData = async(id: string) => {
const user = await getUserFromCookie(cookies());
const project = await db.project.findFirst({
	where: {
		id,
		ownerId: user?.id
	},
	include: {
		tasks: true,
		}
	})
	return {
	...project,
	tasks: project?.tasks.map(task => {
		return {
			...task,
			due: task.due?.toJSON(),
			createdAt: task.createdAt.toJSON(),
			updatedAt: task.updatedAt.toJSON()**
		}
	})}
}
```

And changed the type accordingly.

```ts
export type ProjectProps = Omit<
Project,
"due" | "createdAt" | "updatedAt" | "tasks"
> & {
due: string | undefined;
createdAt: string | undefined;
updatedAt: string | undefined;
deletedAt: string | null;
	tasks: {
	due: string | undefined;
	createdAt: string | undefined;
	updatedAt: string | undefined;
	deletedAt: string | null;
	};
};
```

###  Error: Vercel deploy fail - prisma generate error

**Error Message**

```
PrismaClientInitializationError: Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the "prisma generate" command during the build process.
```

**Problem**

Vercel cashes dependencies, so I have to tell vercel to generate new Prisma Client during the build process.

**Solution**

Add to package.json

```json
{
...
	"scripts" {
		"postinstall": "prisma generate"
	}
...
}
```

## 🔜 Future Challenge
- [ ] Add User Profile page & Settings page
- [ ] Style Status page's task cards
