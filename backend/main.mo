actor class Main(initArgs : { phrase : Text }) {
	public query func greet(name : Text) : async Text {
		return initArgs.phrase # ", " # name # "!";
	};

	public query ({ caller }) func whoAmI() : async Principal {
		return caller;
	};
};
