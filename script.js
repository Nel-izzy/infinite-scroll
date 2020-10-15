const filter = document.getElementById("filter");
const postsContainer = document.getElementById("posts-container");
const loader = document.getElementById("loader");

let limit = 3;
let page = 1;

// Fetch post from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}
//The Fetch API provides an interface for fetching resources (including across the network).

// show posts to DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="post-number">${post.id}</div>
    <div class="post-info">
    <h2 class="post-title">${post.title}</h2>
    <div class="post-body">${post.body}</div>
    </div>
    `;
    postsContainer.appendChild(postEl);
    // The Node.appendChild() method adds a node to the end of the list of children of a specified parent node.
    // The fetch() method takes one mandatory argument, the path to the resource you want to fetch.
    // It returns a Promise that resolves to the Response to that request, whether it is successful or not
  });
}

function showLoading() {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}
//The setTimeout() method of the WindowOrWorkerGlobalScope mixin
// sets a timer which executes a function or specified piece of code once the timer expires.

// Add more posts to DOM on scrool down
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) showLoading();
});
//Document.documentElement returns the Element that is the root element of the document
//The Element.scrollTop property gets or sets the number of pixels that an element's content is scrolled vertically.
//The Element.clientHeight read-only property is zero for elements with no CSS or inline layout boxes; otherwise,
//it's the inner height of an element in pixels.
//It includes padding but excludes borders, margins, and horizontal scrollbars (if present).
//The Element.scrollHeight read-only property is a measurement of the height of an element's content,
//including content not visible on the screen due to overflow.
//element.scrollHeight - element.scrollTop == element.clientHeight

// filter posts by search term
filter.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");
  //The Element method querySelectorAll() returns a static NodeList representing a list of elements matching the
  // specified group of selectors which are descendants of the element on which the method was called.
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toLowerCase();
    const body = post.querySelector(".post-body").innerText.toLowerCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
});

// Show initial Posts
showPosts();
