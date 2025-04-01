// Import required modules

const express = require('express');
const crypto = require('crypto');
const md5 = require('md5');
const axios = require('axios');
const qv_id_fn = require('./qv_id');

const BASE_URL = 'https://api.bilibili.com/x/web-interface/wbi/search/type?';

// hard coded param values
const CATEGORY_ID = '';
const SEARCH_TYPE = 'video';
const AD_RESOURCE = '5654';
const REFRESH = 'true'; //__refresh__
const EXTRA = ''; // _extra
const CONTEXT = '';
const PAGE = 1;
const PAGE_SIZE = 42;
const PUBTIME_BEGIN_S = 0;
const PUBTIME_END_S = 0;
const FROM_SOURCE = '';
const FROM_SPMID = '333.337';
const PLATFORM = 'pc';
const HIGHLIGHT = 1;
const SINGLE_COLUMN = 0;
const SOURCE_TAG = 3;
const GAIA_VTOKEN = 's';
const PAGE_EXP = 0;
const WEB_LOCATION = 1430654;
const mixinKeyEncTab = [
    46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
    33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
    61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
    36, 20, 34, 44, 52
];

const getMixinKey = (orig) => mixinKeyEncTab.map(n => orig[n]).join('').slice(0, 32);


async function getWbiKeys() {
    const res = await fetch('https://api.bilibili.com/x/web-interface/nav', {
        headers: {
            // SESSDATA 字段
            Cookie: 'SESSDATA=xxxxxx',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            Referer: 'https://www.bilibili.com/'//对于直接浏览器调用可能不适用
        }
    });

    const { data: { wbi_img: { img_url, sub_url } } } = await res.json();

    return {
        img_key: img_url.slice(
            img_url.lastIndexOf('/') + 1,
            img_url.lastIndexOf('.')
        ),
        sub_key: sub_url.slice(
            sub_url.lastIndexOf('/') + 1,
            sub_url.lastIndexOf('.')
        )
    }
}

function encWbi(params, img_key, sub_key) {
    const mixin_key = getMixinKey(img_key + sub_key),
        curr_time = Math.round(Date.now() / 1000),
        chr_filter = /[!'()*]/g;

    Object.assign(params, { wts: curr_time });
    const query = Object
        .keys(params)
        .sort()
        .map(key => {
            const value = params[key].toString().replace(chr_filter, '');
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        })
        .join('&');

    const wbi_sign = md5(query + mixin_key); // 计算 w_rid

    return query + '&w_rid=' + wbi_sign
}

function getVideoData() {
    // Get the current UNIX timestamp in seconds
    let currentTimestamp = Math.floor(Date.now() / 1000);
    // Add 3 days (3 days * 24 hours * 60 minutes * 60 seconds)
    let futureTimestamp = currentTimestamp + (3 * 24 * 60 * 60);

    const cookieVal = `bili_ticket_expires=${futureTimestamp}; CURRENT_FNVAL=2000;`;

    // make a request and get the page with video source
    axios.get('https://api.example.com/data', {
        headers: {
            'Cookie': cookieVal
        }
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Initialize the express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to encrypt data
app.post('/encrypt', async (req, res) => {
    // const inputParams = req.body;
    // console.log('input params received: ', inputParams);
    //
    // if (!inputParams) {
    //     return res.status(400).json({ message: 'Data is required' });
    // }


    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    // Use URL constructor to parse the URL
    const parsedUrl = new URL(url);
    // Extract parameters
    const keyword = parsedUrl.searchParams.get('keyword');
    const page = +parsedUrl.searchParams.get('page') || 1;
    const o = +parsedUrl.searchParams.get('o') || 42;


    console.log('keyword', keyword);
    console.log('page', page);
    console.log('o', o);

    const qv_id = qv_id_fn.hee(32, "0-9a-zA-Z");
    console.log('test', qv_id);

    // Create params for encryption and return fetch URL
    const inputParams = {
        category_id: CATEGORY_ID,
        search_type: SEARCH_TYPE,
        ad_resource: AD_RESOURCE,
        __refresh__: REFRESH,
        _extra: EXTRA,
        context: CONTEXT,
        page: page,
        page_size: PAGE_SIZE,
        pubtime_begin_s: PUBTIME_BEGIN_S,
        pubtime_end_s: PUBTIME_END_S,
        from_source: FROM_SOURCE,
        from_spmid: FROM_SPMID,
        platform: PLATFORM,
        highlight: HIGHLIGHT,
        single_column: SINGLE_COLUMN,
        keyword: keyword,
        qv_id: qv_id,
        source_tag: SOURCE_TAG,
        gaia_vtoken: GAIA_VTOKEN,
        dynamic_offset: page * PAGE_SIZE,
        page_exp: PAGE_EXP,
        web_location: WEB_LOCATION
    };


    const web_keys = await getWbiKeys();
    const img_key = web_keys.img_key, sub_key = web_keys.sub_key;
    const query = encWbi(inputParams, img_key, sub_key);

    console.log('returning data: ', BASE_URL + query);

    return res.status(200).json(BASE_URL + query);
});



// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
