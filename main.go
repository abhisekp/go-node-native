package main

import (
	"fmt"
	"go-node-native/handlers"
)
import "github.com/akshayganeshen/napi-go/entry"

func init() {
	entry.Export("myHandler", handlers.MyHandler)
}

func main() {
	fmt.Println("Hello World")
}
