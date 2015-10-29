@:partials(PartialFoo, PartialBar)
class Sample implements partials.Partial {
	static public function main() {
		trace("My partials are here!");
		foo();
		bar();
	}
}