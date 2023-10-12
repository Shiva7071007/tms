function solution(S, A) {
  let ans = 0;

  function rec(adj, node, s) {
    let maxLength = 0;
    let leftMaxLength = 0;

    for (const [char, to] of adj[node]) {
      if (char !== s[node]) {
        const temp = rec(adj, to, s);
        ans = Math.max(ans, leftMaxLength + 1 + temp);
        leftMaxLength = Math.max(leftMaxLength, temp);
        maxLength = Math.max(maxLength, temp);
      } else {
        const temp = rec(adj, to, s);
        ans = Math.max(ans, temp);
      }
    }

    return maxLength + 1;
  }

  const n = A.length;
  const adj = new Array(n).fill().map(() => []);

  ans = Math.min(1, n);

  for (let i = 0; i < n; i++) {
    if (A[i] === -1) continue;
    adj[A[i]].push([S[i], i]);
  }

  rec(adj, 0, S);

  return ans;
}

// Example usage:
let parent = [-1, 0, 0, 0, 2];
let s = "abbab";
console.log(solution(s, parent)); // Output: 3

s="abab"
parent=[-1,2,0,1]
console.log(solution(s, parent)); // Output: 2

s="ab"
parent=[-1,0]
console.log(solution(s, parent)); // Output: 1
