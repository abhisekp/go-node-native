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

func Sum(a, b float64) float64 {
	return a + b
}

func SumHandler(env napi.Env, info napi.CallbackInfo) napi.Value {
	args, _ := napi.GetCbInfo(env, info)
	if len(args.Args) != 2 {
		napi.ThrowError(env, "EArgumentLength", "Wrong number of arguments")
		return nil
	}

	a, status := napi.GetValueDouble(env, args.Args[0])
	if status != napi.StatusOK {
		napi.ThrowError(env, "EInvalidValue", "Invalid value for a")
		return nil
	}
	b, status := napi.GetValueDouble(env, args.Args[1])
	if status != napi.StatusOK {
		napi.ThrowError(env, "EInvalidValue", "Invalid value for b")
		return nil
	}

	fmt.Printf("a = %v, b = %v", a, b)
	result, _ := napi.CreateDouble(env, Sum(a, b))

	return result
}

func init() {
	entry.Export("myHandler", MyHandler)
	entry.Export("sum", SumHandler)
}

func main() {}
