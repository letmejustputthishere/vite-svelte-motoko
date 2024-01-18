import { Main } "../main";

let main = await Main();

assert (await main.greet("Moritz")) == "Hello, Moritz!";
