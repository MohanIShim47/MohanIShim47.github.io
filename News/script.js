const defaultNews = [];
let savedNews = null;

try {
    savedNews =
        JSON.parse(
            localStorage.getItem("bluewire-news")
        );

} catch (error) {
    console.log(
        "Could not load saved articles."
    );
}


if (
    !Array.isArray(savedNews) ||
    savedNews.length === 0
) {

    savedNews = defaultNews;

    localStorage.setItem(
        "bluewire-news",
        JSON.stringify(savedNews)
    );

}

function deleteArticle(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this article?"
    );

    if (!confirmed) {
        return;
    }

    news = news.filter(function(article) {
        return Number(article.id) !== Number(id);
    });

    localStorage.setItem(
        "bluewire-news",
        JSON.stringify(news)
    );

    displayNews(news);
}

let news = savedNews;


function displayNews(items) {


    const container =
        document.getElementById(
            "news-container"
        );



    if (!container) return;

    container.innerHTML = "";
    if (items.length === 0) {

        container.innerHTML = `
            <p class="no-articles">
                No articles found in this category.
            </p>
        `;

        return;

    }

    items.forEach(function(article) {

        const articleCard =
            document.createElement("article");

        articleCard.className =
            "news-card";

        articleCard.innerHTML = `
            <div class="card-image">
                📰
            </div>

            <div class="card-content">
                <div class="card-category">
                    ${escapeHTML(article.category)}
                </div>

                <h3>
                    ${escapeHTML(article.title)}
                </h3>

                <p>
                    ${escapeHTML(article.description)}
                </p>

                <div class="card-footer">
                    <span>
                        ${escapeHTML(article.date)}
                    </span>
                    <a
                        href="article.html?id=${article.id}"
                        class="read-more"
                    >
                        Read More →
                    </a>
                </div>
            </div>
        `;


        container.appendChild(articleCard);


    });


}

function filterNews(category, button) {
    document
        .querySelectorAll(".category")
        .forEach(function(item) {
            item.classList.remove(
                "active"
            );
        });


    if (button) {
        button.classList.add(
            "active"
        );
    }


    if (category === "all") {
        displayNews(news);
        return;
    }

    const filteredNews =
        news.filter(function(article) {
            return (
                article.category
                    .toLowerCase()
                ===
                category.toLowerCase()
            );
        });

    displayNews(filteredNews);


}

function displayArticle() {


    const container =
        document.getElementById(
            "article-content"
        );

    if (!container) return;


    const parameters =
        new URLSearchParams(
            window.location.search
        );


    const articleId =
        Number(
            parameters.get("id")
        );

    const article =
        news.find(function(item) {

            return Number(item.id)
                === articleId;

        });

    if (!article) {


        container.innerHTML = `

            <h1 class="full-title">
                Article Not Found
            </h1>


            <p>
                This article may have been deleted.
            </p>

        `;


        return;

    }

    container.innerHTML = `

        <div class="full-category">
            ${escapeHTML(article.category)}
        </div>


        <h1 class="full-title">
            ${escapeHTML(article.title)}
        </h1>


        <p class="full-date">
            Published on
            ${escapeHTML(article.date)}
        </p>


        <p class="full-description">
            ${escapeHTML(article.description)}
        </p>


        <div class="full-body">
            ${escapeHTML(article.content)}
        </div>

    `;

    document.title =
        article.title +
        " | BlueWire News";


}

const postForm =
    document.getElementById(
        "post-form"
    );


if (postForm) {


    postForm.addEventListener(
        "submit",

        function(event) {


            event.preventDefault();


            const title =
                document
                    .getElementById(
                        "post-title"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "post-category"
                    )
                    .value;


            const description =
                document
                    .getElementById(
                        "post-description"
                    )
                    .value
                    .trim();


            const content =
                document
                    .getElementById(
                        "post-content"
                    )
                    .value
                    .trim();

            if (
                !title ||
                !description ||
                !content
            ) {
                alert(
                    "Please complete all fields."
                );
                return;
            }

            const newArticle = {
                id: Date.now(),


                title:
                    title,
                category:
                    category,

                date:
                    new Date()
                        .toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }
                        ),


                description:
                    description,
                content:
                    content
            };

            news.unshift(
                newArticle
            );

            localStorage.setItem(

                "bluewire-news",

                JSON.stringify(news)

            );

            window.location.href =

                "article.html?id=" +

                newArticle.id;
        }
    );
}

function escapeHTML(text) {
    if (
        text === undefined ||
        text === null
    ) {
        return "";
    }

    const div =
        document.createElement("div");

    div.textContent =
        String(text);

    return div.innerHTML;

}

displayNews(news);
displayArticle();