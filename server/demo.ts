// type User = {
//   id: string;
//   name: string;
//   email: string;
//   age: number;
//   address?: {
//     street: string;
//     city: string;
//   };
// };

import { extend } from "zod/v4-mini";

// function getUser(user: Readonly<User>) {}
// function updateUser(userD: Partial<User>) {}
// function createUser(user: Omit<User, "id">) {}

// function createUserWithAdress(user: Required<User>) {}

// function renderUserDetails(user: Pick<User, "name" | "age">) {
//   console.log(user.age, "and ", user.name);
// }

// const user: User = {
//   id: "1",
//   name: "John Doe",
//   email: "john.doe@example.com",
//   age: 30,
//   address: {
//     street: "123 Main St",
//     city: "Anytown",
//   },
// };

// updateUser({
//   name: "keyle",
//   age: 20,
// });
// renderUserDetails(user);

// // type T = Record<string, Partial<User>>;
// // const a: T = {
// //   sankar: {
// //     name: "",
// //   },
// //   kimmu: {
// //     age: 30,
// //   },
// // };

// type T = Record<"admin" | "user", { test: string }>;
// const a: T = {
//   admin: {
//     test: "ljflaf",
//   },
//   user: {
//     test: "ljfa",
//   },
// };

// type Role = "admin" | "user" | "moderator";
// type otherRole = 'tester' | 'admin' | 'security'

// type T = Extract<Role, otherRole>;
// type T2 = Exclude<Role, 'admin'>
// type T3 = Exclude<Role, otherRole>

// function getUser(id: string) {
//   return { name: "sankar", age: 30 };
// }

// function getUserWithByAgeAndId(id: Parameters<typeof getUser>[0], age: 30) {
//   return getUser(id);
// }

// type T = ReturnType<typeof getUser>;
// type Params = Parameters<typeof getUser>;

// const user: T = getUser("lkfja");

// class User {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }
// }

// type A = string | null | undefined;

// type T = NonNullable<A>

// async function getUser(id: string) {
//   return Promise.resolve({ name: "ljfalj" });
// }

// type T = ReturnType<typeof getUser>;
// type T2 = Awaited<T>;
// const res: T = getUser("ljfa");

// class Animal {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// class Dog extends Animal {
//   bark() {
//     console.log("bark");
//   }
// }

// const dog = new Dog("kfajfa");
// dog.bark();

// interface A {
//   name: string;
// }

// interface B extends A {
//   name2: string;
// }

// const b: B = {
//   name: "lfja",
//   name2: "lkjfa",
// };

// type A = {
//   name: string;
// };

// type C = {
//   age?: number;
// };

// type B = A &
//   C & {
//     name2: string;
//   };

// const b: B = {
//   name: "lfja",
//   name2: "lkjfa",
// };

// function getFirstElement<T>(array: T[]) {
//   return array[0];
// }

// const items = ["lfja", "kjfakj", "ljfak"];
// const items2 = [1, 2, 3, 4];

// const strings = getFirstElement(items);
// const numbers = getFirstElement(items2);

// type ApiResponse<Data> = {
//   data: Data;
//   isError: boolean;
// };

// const response: ApiResponse<{ name: string; age: number }> = {
//   data: {
//     name: "sla",
//     age: 30,
//   },
//   isError: false,
// };

// type Generic<T> = {
//   name: T;
//   age: number;
// };

// const a: Generic<string> = {
//   name: "sla",
//   age: 30,
// };


// type Generic<T> = {
//   prop: T extends string ? T extends number ? number : undefined : string
// }

// const a: Generic<string> = {
//   prop: undefined
// }

// const b: Generic<void> = {
//   prop: "sla",
// }


type Generic<T> = T extends Array<infer A> ? A : T


const nums = ['ljfa', 'ljfa'];
const a: Generic<typeof nums> = "sla"




