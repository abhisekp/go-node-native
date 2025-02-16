package main

import (
	"github.com/abhisekp/napi-go/entry"
	"go-node-native/handlers"
)

func init() {
	entry.Export("myHandler", handlers.MyHandler)
	entry.Export("sum", handlers.SumHandler)
	entry.Export("map", handlers.MapHandler)
}

func main() {}
