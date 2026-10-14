package handlers

import (
	"github.com/abhisekp/napi-go"
)

func MyHandler(env napi.Env, info napi.CallbackInfo) napi.Value {
	result, status := napi.CreateStringUtf8(env, "MyHandler")
	if status != napi.StatusOK {
		return nil
	}
	return result
}
