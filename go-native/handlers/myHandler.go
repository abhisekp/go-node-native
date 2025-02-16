package handlers

import (
	"fmt"
	"github.com/abhisekp/napi-go"
)

func MyHandler(env napi.Env, info napi.CallbackInfo) napi.Value {
	fmt.Println("This comes from inside the MyHandler")
	result, _ := napi.CreateStringUtf8(env, "MyHandler")
	return result
}
