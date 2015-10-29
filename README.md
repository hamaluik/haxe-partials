# haxe-partials
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/FuzzyWuzzie/haxe-partials/blob/master/LICENSE)

A simple macro library for writing classes as partials (splitting a single class into multiple source files). In the context of this library, partials are the same as [C# partials](https://msdn.microsoft.com/en-CA/library/wa80x488.aspx), and really just allow for a bit more organization.

You probably don't even really want to use this in production, as if you are, it likely means your classes have gotten out of hand and you should refactor to keep things [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). That said, partials still serve a great deal of utility, such as helping you break apart those monolithic classes to examine code patterns and help your refactor. A more in-depth discussion of their utility is available on [StackExchange](http://programmers.stackexchange.com/questions/71494/why-use-partial-classes).

This library was inspired by [mpartial](https://github.com/massiveinteractive/mpartial). This library is **far** simpler and does much less than mpartial. However, mpartial is now quite out of date and is no longer usable thanks to changes in [tink_macro](https://github.com/haxetink/tink_macro).

That said, you can still do a lot of the same things, such as separate platform-specific code into different partials which get included based on `#if` defines.

## Usage

To define a class as a partial, simply implement the `partials.Partial` interface. To indicate the "host" class for a series of partials, use the `@:partials()` metadata on the class.

## Examples

### Basic Usage

```haxe
package my.package;

@:partials(my.package.PartialDefinitionA, my.package.partials.PartialDefinitionB)
class MyClassThatWouldBeReallyLongWithoutPartials implements partials.Partial {
    public function new() {
        trace("My partials are here!");
        foo();
        bar();
    }
}
```

```haxe
package my.package;

class PartialDefinitionA implements partials.Partial {
    public function foo() {
        trace("FOO!");
    }
}
```

```haxe
package my.package.partials;

class PartialDefinitionB implements partials.Partial {
    public function bar() {
        trace("BAR!");
    }
}
```

This would output:

```
My partials are here!
FOO!
BAR!
```

### Platform-Specific Partials

```haxe
#if js
@:partials(Log_js)
#elseif cpp
@:partials(Log_cpp)
#end
class Log implements partials.Partial {
    public static function info(msg:String) {
        log("info", msg);
    }

    public static function warn(msg:String) {
        log("warn", msg);
    }

    public static function error(msg:String) {
        throw msg;
    }
}
```

```haxe
class Log_js implements partials.Partial {
    public static function log(level:String, msg:String) {
        var style:String = switch(level) {
            case "info":
                "color: green;"
            case "warn":
                "color: orange; font-weight: bold;"
        };
        untyped console.log("%c" + level + ": " + msg, style);
    }
}
```

```haxe
class Log_cpp implements partials.Partial {
    public static function log(level:String, msg:String) {
        trace(level + ": " + msg);
    }
}
```
