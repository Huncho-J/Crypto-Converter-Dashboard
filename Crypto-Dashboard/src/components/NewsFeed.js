import axios from 'axios';
import {useState, useEffect} from 'react';

const NewsFeed = () => {

  const [articles, setArticles] = useState(null);
  useEffect(()=> {
var options = {
  method: 'GET',
  url: 'http://localhost:8000/news',
};

axios.request(options).then(function (response) {
	console.log(response.data);
  setArticles(response.data)
}).catch(function (error) {
	console.error(error);
});
  }, [])

  console.log(articles)

const first7articles = articles?.slice(0,7)

  return (
    <div className="news-feed">
    <h2>NewsFeed</h2>
    {first7articles?.map((article, _index) => (
      <div key={_index}>
      <a href={article.url}><p>{article.title}</p></a>
    </div>
    ))}
    </div>
  );
}

export default NewsFeed;
