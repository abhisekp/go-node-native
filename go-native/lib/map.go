package lib

import "cmp"

type CallbackFn[T cmp.Ordered] func(T) T

func Map[T cmp.Ordered](arr []T, cb CallbackFn[T]) []T {
	result := make([]T, len(arr))
	for i, v := range arr {
		result[i] = cb(v)
	}
	return result
}
