package lib

import "testing"

func TestSum(t *testing.T) {
	if got := Sum(1.25, -0.5); got != 0.75 {
		t.Fatalf("Sum = %v, want 0.75", got)
	}
	if got := Sum("a", "b"); got != "ab" {
		t.Fatalf("Sum = %v, want ab", got)
	}
}

func TestMap(t *testing.T) {
	input := []int{1, 2, 3}
	result := Map(input, func(n int) int { return n * 2 })
	if len(result) != 3 || result[0] != 2 || result[1] != 4 || result[2] != 6 {
		t.Fatalf("Map = %v", result)
	}
	result[0] = 99
	if input[0] != 1 {
		t.Fatal("Map changed input")
	}
	if got := Map([]int{}, func(int) int { t.Fatal("callback called for empty input"); return 0 }); len(got) != 0 {
		t.Fatalf("empty Map = %v", got)
	}
}
