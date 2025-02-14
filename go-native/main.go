package main

import (
	"fmt"
	"github.com/akshayganeshen/napi-go"
	"github.com/akshayganeshen/napi-go/entry"
)

func MyHandler(env napi.Env, info napi.CallbackInfo) napi.Value {
	fmt.Println("This comes from inside the MyHandler")
	result, _ := napi.CreateStringUtf8(env, "MyHandler")
	return result
}

func init() {
	entry.Export("myHandler", MyHandler)
}

func main() {
	fmt.Println("Hello World")
}
