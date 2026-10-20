
import express from 'express';
import { Liquid } from 'liquidjs';
import path from 'path';

const app = express();
const port = process.env.PORT || 8000;

// ====================
// MIDDLEWARE
// ====================
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./assets')));

// ====================
// LIQUID ENGINE
// ====================
const engine = new Liquid({
  root: path.resolve('./views'),
  extname: '.liquid'
});

app.engine('liquid', engine.express());
app.set('view engine', 'liquid');

// ====================
// API
// ====================
const API_URL =
  'https://fdnd-agency.directus.app/items/f_houses';

// ====================
// FAVORITES (TEMP STORAGE)
// ====================
let favorites = [];

// ====================
// HOMEPAGE
// ====================
app.get('/', async (req, res) => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Directus API fout: ${response.status}`);
    }

    const data = await response.json();
    let listings = data.data;

    const sort = req.query.sort;

    if (sort === 'a-z') {
      listings = listings.sort((a, b) =>
        a.street.localeCompare(b.street)
      );
    }

    if (sort === 'z-a') {
      listings = listings.sort((a, b) =>
        b.street.localeCompare(a.street)
      );
    }

    res.render('index.liquid', {
      listings,
      favorites,
      sort
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Fout bij laden woningen');
  }
});

// ====================
// DETAIL PAGE
// ====================
app.get('/listing/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Directus API fout: ${response.status}`);
    }

    const data = await response.json();
    const house = data.data;

    if (!house) {
      return res.status(404).send('Woning niet gevonden');
    }

    const isFavorite = favorites.some(
      favorite => String(favorite.id) === String(id)
    );

    res.render('detail.liquid', {
      listing: {
        ...house,
        is_favorite: isFavorite
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Fout bij laden woning');
  }
});

// ====================
// ADD / REMOVE FAVORITE
// ====================
app.post('/favorites/add/:id', async (req, res) => {
  const id = req.params.id;

  // Alleen fetch-aanvragen met deze header krijgen JSON.
  const wantsJson =
    req.get('X-Requested-With') === 'XMLHttpRequest';

  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Directus API fout: ${response.status}`);
    }

    const data = await response.json();
    const house = data.data;

    if (!house) {
      return res.status(404).send('Woning niet gevonden');
    }

    const index = favorites.findIndex(
      favorite => String(favorite.id) === String(id)
    );

    let isFavorite;

    if (index === -1) {
      favorites.push({
        id: house.id,
        street: house.street,
        house_nr: house.house_nr,
        city: house.city,
        price: house.price,
        image: house.poster_image
      });

      isFavorite = true;
    } else {
      favorites.splice(index, 1);
      isFavorite = false;
    }

    // JavaScript: stuur JSON terug.
    if (wantsJson) {
      return res.json({
        success: true,
        isFavorite,
        count: favorites.length
      });
    }

    // Zonder JavaScript: stuur terug naar de detailpagina.
    return res.redirect(`/listing/${id}`);
  } catch (error) {
    console.error(error);

    if (wantsJson) {
      return res.status(500).json({
        success: false,
        message: 'Fout bij opslaan van favoriet'
      });
    }

    return res.status(500).send(
      'Fout bij opslaan van favoriet'
    );
  }
});

// ====================
// FAVORITES PAGE
// ====================
app.get('/favorites', (req, res) => {
  res.render('favorites.liquid', {
    favorites
  });
});

// ====================
// DELETE FAVORITE
// ====================
app.post('/favorites/delete/:id', (req, res) => {
  const id = req.params.id;

  const index = favorites.findIndex(
    favorite => String(favorite.id) === String(id)
  );

  if (index !== -1) {
    favorites.splice(index, 1);
  }

  return res.redirect('/favorites');
});

// ====================
// SERVER START
// ====================
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
