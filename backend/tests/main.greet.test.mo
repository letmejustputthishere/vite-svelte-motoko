import { Main } "../main";

let main = await Main({ phrase = "Hello" });

assert (await main.greet("Moritz")) == "Hello, Moritz!";
