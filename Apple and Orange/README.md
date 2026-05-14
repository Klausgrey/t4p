# Apples and Oranges

## Description
Given the positions of Sam's house, an apple tree, and an orange tree on a number line, determine how many apples and oranges land on Sam's house.

## How it works
- Each fruit lands at `tree position + distance`
- Count how many apples and oranges land within the inclusive range `[s, t]`
- Print apple count, then orange count

## Parameters
- `s` - starting position of Sam's house
- `t` - ending position of Sam' house
- `a` - position of the apple tree
- `b` - position of the apple tree
- `apples` - list of distances each apple falls from `a`
- `oranges` - list of distances each orange falls from `b`


## Sample Input
```
7 11
5 15
3 2
-2 2 1
5 -6
```

## Sample Output

```
1
1
```