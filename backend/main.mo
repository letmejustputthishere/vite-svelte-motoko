actor class Main() {
	public query func greet(name : Text) : async Text {
		return "Hello, " # name # "!";
	};

	public query ({ caller }) func whoAmI() : async Principal {
		return caller;
	};
};
