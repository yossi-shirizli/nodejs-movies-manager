/* eslint-disable */
import '@babel/polyfill';
import { addMovie, editMovie } from './movies';
import { addRelease, editRelease, deleteRelease } from './releases';

window.DeleteTableRowFunction = function() {
  // event.target will be the input element.
  var td = event.target.parentNode;
  var tr = td.parentNode; // the row to be removed
  if (tr.parentNode.childElementCount > 1) {
    tr.parentNode.removeChild(tr);
  }
};
window.DeleteReleaseConfirmation = function(id, name) {
  var retVal = confirm('Do you want to DELETE release ' + name + '?');
  if (retVal == true) {
    deleteRelease(id);
    // return true;
  }
  // return false;
};
window.DeleteMovieConfirmation = function(id, title) {
  var retVal = confirm('Do you want to DELETE all ' + title + ' related data?');
  if (retVal == true) {
    console.log('DELETE MOVIE', title, id);
    // deleteRelease(id);
    // return true;
  }
  // return false;
};

// // DOM ELEMENTS
const addMovieForm = document.querySelector('.form-movies-add');
const editMovieForm = document.querySelector('.form-movies-edit');
const addReleaseForm = document.querySelector('.form-releases-add');
const editReleaseForm = document.querySelector('.form-releases-edit');
const videoStreamsTable = document.querySelector(
  '.table-release-streams-video'
);
const audioStreamsTable = document.querySelector(
  '.table-release-streams-audio'
);
// // VALUES

// // DELEGATION
if (addMovieForm) {
  addMovieForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('save-movie').disabled = true;
    const title = document.getElementById('movie-title').value.trim();
    const status = document.getElementById('movie-status').value;
    const imdbLink = document.getElementById('imdb-link').value.trim();
    const isKids =
      document.getElementById('kids').checked == true ? true : false;
    const isClassic =
      document.getElementById('classic').checked == true ? true : false;
    const releaseDate =
      document.getElementById('release-date').value != ''
        ? document.getElementById('release-date').value
        : undefined;
    const ratingsAverage =
      document.getElementById('ratings-average').value != ''
        ? document.getElementById('ratings-average').value * 1
        : undefined;
    const ratingsQuantity =
      document.getElementById('ratings-quantity').value != ''
        ? document.getElementById('ratings-quantity').value * 1
        : undefined;
    const geners = document
      .getElementById('geners')
      .value.replaceAll(' ', '')
      .split(',');
    const duration =
      document.getElementById('duration').value != ''
        ? document.getElementById('duration').value * 1
        : undefined;
    const plot =
      document.getElementById('plot').value.trim() != ''
        ? document.getElementById('plot').value.trim()
        : undefined;
    const mpaa =
      document.getElementById('mpaa').value.trim() != ''
        ? document.getElementById('mpaa').value.trim()
        : undefined;
    const poster =
      document.getElementById('poster').value.trim() != ''
        ? document.getElementById('poster').value.trim()
        : undefined;

    addMovie({
      status,
      title,
      imdbLink,
      releaseDate,
      ratingsAverage,
      ratingsQuantity,
      isKids,
      isClassic,
      plot,
      mpaa,
      geners,
      poster,
      duration
    });
  });
}
if (editMovieForm) {
  editMovieForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('save-movie').disabled = true;
    const title = document.getElementById('movie-title').value.trim();
    const status = document.getElementById('movie-status').value;
    const imdbLink = document.getElementById('imdb-link').value.trim();
    const isKids =
      document.getElementById('kids').checked == true ? true : false;
    const isClassic =
      document.getElementById('classic').checked == true ? true : false;
    const releaseDate =
      document.getElementById('release-date').value != ''
        ? document.getElementById('release-date').value
        : null;
    const ratingsAverage =
      document.getElementById('ratings-average').value != ''
        ? document.getElementById('ratings-average').value * 1
        : null;
    const ratingsQuantity =
      document.getElementById('ratings-quantity').value != ''
        ? document.getElementById('ratings-quantity').value * 1
        : null;
    const geners = document
      .getElementById('geners')
      .value.replaceAll(' ', '')
      .split(',');
    const duration =
      document.getElementById('duration').value != ''
        ? document.getElementById('duration').value * 1
        : null;
    const plot =
      document.getElementById('plot').value.trim() != ''
        ? document.getElementById('plot').value.trim()
        : null;
    const mpaa =
      document.getElementById('mpaa').value.trim() != ''
        ? document.getElementById('mpaa').value.trim()
        : null;
    const poster =
      document.getElementById('poster').value.trim() != ''
        ? document.getElementById('poster').value.trim()
        : null;
    const movieId = document.getElementById('movie-id').innerText;
    editMovie(
      {
        status,
        title,
        imdbLink,
        releaseDate,
        ratingsAverage,
        ratingsQuantity,
        isKids,
        isClassic,
        plot,
        mpaa,
        geners,
        poster,
        duration
      },
      movieId
    );
  });
}

if (addReleaseForm) {
  addReleaseForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('save-release').disabled = true;
    const videos = getVideos(videoStreamsTable);
    // console.log(videos);
    const audios = getAudios(audioStreamsTable);
    // console.log(audios);
    //------
    const movie = document.getElementById('release-movie').value;
    const status = document.getElementById('release-status').value;
    const name = document.getElementById('release-name').value.trim();
    const category = document.getElementById('release-category').value;
    const hdr = document.getElementById('release-hdr').value;
    const source = document.getElementById('release-source').value;
    let duration = 0;
    if (document.getElementById('release-duration-s').value) {
      duration = document.getElementById('release-duration-s').value * 1;
    }
    if (document.getElementById('release-duration-m').value) {
      duration =
        duration + document.getElementById('release-duration-m').value * 60;
    }
    if (document.getElementById('release-duration-h').value) {
      duration =
        duration +
        document.getElementById('release-duration-h').value * 60 * 60;
    }
    if (duration == 0) {
      duration = undefined;
    }
    let sizeByte =
      document.getElementById('release-size').value != ''
        ? document.getElementById('release-size').value * 1
        : undefined;
    if (sizeByte === 0) sizeByte = undefined;
    if (sizeByte) {
      if (document.getElementById('release-size-type').value === 'GB') {
        sizeByte = sizeByte * 1024;
      }
      sizeByte = sizeByte * 1024 * 1024;
    }
    let bitrate =
      document.getElementById('release-bitrate').value != ''
        ? document.getElementById('release-bitrate').value * 1
        : undefined;
    if (bitrate === 0) {
      bitrate = undefined;
    }
    const location = document.getElementById('release-location').value;
    const chapters =
      document.getElementById('release-chapters').checked == true
        ? true
        : false;
    const hebSub = document.getElementById('release-hebrew-subs').value;
    const engSub = document.getElementById('release-english-subs').value;

    addRelease({
      movie,
      status,
      name,
      category,
      hdr,
      source,
      duration,
      sizeByte,
      bitrate,
      location,
      chapters,
      hebSub,
      engSub,
      videos,
      audios
    });
  });
}
if (editReleaseForm) {
  editReleaseForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('save-release').disabled = true;
    const videos = getVideos(videoStreamsTable);
    // console.log(videos);
    const audios = getAudios(audioStreamsTable);
    // console.log(audios);
    //------
    const releaseId = document.getElementById('release-id').innerText;
    const movie = document.getElementById('release-movie').value;
    const status = document.getElementById('release-status').value;
    const name = document.getElementById('release-name').value.trim();
    const category = document.getElementById('release-category').value;
    const hdr = document.getElementById('release-hdr').value;
    const source = document.getElementById('release-source').value;
    let duration = 0;
    if (document.getElementById('release-duration-s').value) {
      duration = document.getElementById('release-duration-s').value * 1;
    }
    if (document.getElementById('release-duration-m').value) {
      duration =
        duration + document.getElementById('release-duration-m').value * 60;
    }
    if (document.getElementById('release-duration-h').value) {
      duration =
        duration +
        document.getElementById('release-duration-h').value * 60 * 60;
    }
    if (duration == 0) {
      duration = null;
    }
    let sizeByte =
      document.getElementById('release-size').value != ''
        ? document.getElementById('release-size').value * 1
        : null;
    if (sizeByte === 0) sizeByte = null;
    if (sizeByte) {
      if (document.getElementById('release-size-type').value === 'GB') {
        sizeByte = sizeByte * 1024;
      }
      sizeByte = sizeByte * 1024 * 1024;
    }
    let bitrate =
      document.getElementById('release-bitrate').value != ''
        ? document.getElementById('release-bitrate').value * 1
        : null;
    if (bitrate === 0) {
      bitrate = null;
    }
    const location = document.getElementById('release-location').value;
    const chapters =
      document.getElementById('release-chapters').checked == true
        ? true
        : false;
    const hebSub = document.getElementById('release-hebrew-subs').value;
    const engSub = document.getElementById('release-english-subs').value;

    editRelease(
      {
        movie,
        status,
        name,
        category,
        hdr,
        source,
        duration,
        sizeByte,
        bitrate,
        location,
        chapters,
        hebSub,
        engSub,
        videos,
        audios
      },
      releaseId
    );
  });
}

if (videoStreamsTable) {
  const addStream = document.getElementById('video-add-stream');
  addStream.addEventListener('click', e => {
    e.preventDefault();

    const tbodyRowCount = videoStreamsTable.tBodies[0].rows.length;
    if (tbodyRowCount < 5) {
      var newRow = videoStreamsTable.insertRow();
      newRow.innerHTML =
        '<tr><td><div class="form-group row" style="width:  180px"><div class="col" style="padding-right:0px"><input class="video-size form-control" type="number" style="width:  80px" step="any" min="0" placeholder="21.5"></div><div class="col"><select class="video-size-type form-control" name="videoScanSelect" style="width:  60px; margin:0px"><option value="GB">GB</option><option value="MB">MB</option></select></div></div></td><td><input class="video-codec form-control" type="text" style="text-transform:uppercase; width:  70px" placeholder="HEVC"></td><td><div class="form-group row" style="width: 250px"><div class="col" style="padding-right: 0px"><input class="video-res-w form-control" type="number" style="width:  80px" min="1" step="1" placeholder="3840"></div><div class="col" style="width:90px; margin:0px; padding:0px" align="center">x</div><div class="col" style="padding: 0px"><input class="video-res-h form-control" type="number" style="width:  80px" min="1" step="1" placeholder="2160"></div><div class="col" style="padding-left: 4px"><select class="video-scan form-control" name="videoScanSelect" style="width:  50px"><option value="p">p</option><option value="i">i</option></select></div></div></td><td><div class="form-group row"><div class="col" style="padding-right: 0px"><input class="video-bitrate form-control" type="number" style="width:  100px; margin: 0px" step="any" min="0" placeholder="21.5"></div></div></td><td><input class="video-colors form-control" type="number" style="width:  60px" step="1" min="1" placeholder="10"></td><td><input class="video-fps form-control" type="number" style="width:  95px" step="0.001" min="1" placeholder="23.976"></td><td><input class="video-chroma form-control" type="text" style="width:  70px" placeholder="4:4:4"></td><td><input class="form-control btn btn-outline-danger" type="button" value="Delete Stream" onclick="DeleteTableRowFunction()"></td></tr>';
      var rows = videoStreamsTable.rows;
    }
  });
}
if (audioStreamsTable) {
  const addStream = document.getElementById('audio-add-stream');
  addStream.addEventListener('click', e => {
    e.preventDefault();

    const tbodyRowCount = audioStreamsTable.tBodies[0].rows.length;
    if (tbodyRowCount < 5) {
      var newRow = audioStreamsTable.insertRow();
      newRow.innerHTML =
        '<tr><td><div class="form-group row" style="width:  200px"><div class="col" style="padding-right:0px"><input class="audio-size form-control" type="number" style="width:  100px" step="any" min="0" placeholder="21.5"></div><div class="col"><select class="audio-size-type form-control" name="audioScanSelect" style="width:  60px; margin:0px"><option value="GB">GB</option><option value="MB">MB</option></select></div></div></td><td><select class="audio-language form-control" name="audioLanguageSelect" style="width:  100px; margin: 0px"><option value="Unknown">Unknown</option><option value="English">English</option><option value="Hebrew">Hebrew</option><option value="French">French</option><option value="Spanish">Spanish</option><option value="Italian">Italian</option><option value="Other">Other</option></select></td><td><select class="audio-codec form-control" name="audioCodecSelect" style="width:  140px; margin: 0px"><option value="Atmos">Atmos</option><option value="DTS-X">DTS-X</option><option value="DTS-HD MA">DTS-HD MA</option><option value="Dolby TrueHD">Dolby TrueHD</option><option value="DTS-HD Hi Res">DTS-HD Hi Res</option><option value="DTS-ES">DTS-ES</option><option value="DTS">DTS</option><option value="AAC">AAC</option><option value="Dolby Digital">AC3</option><option value="LPCM">LPCM</option><option value="FLAC">FLAC</option><option value="PCM">PCM</option><option value="Other">Other</option><option value="Unknown" selected="selected">Unknown</option></select></td><td><input class="audio-channels form-control" type="number" style="width:  70px" step="0.1" min="0" placeholder="7.1"></td><td><div class="form-group row"><div class="col" style="padding-right: 0px"><input class="audio-bitrate form-control" type="number" style="width:  100px; margin: 0px" step="any" min="0" placeholder="21.5"></div></div></td><td><input class="audio-depth form-control" type="number" style="width: 80px" step="1" min="0" placeholder="24"></td><td><input class="audio-sample form-control" type="number" style="width: 100px" step="0.1" min="0" placeholder="44KHz"></td><td><input class="form-control btn btn-outline-danger" type="button" value="Delete Stream" onclick="DeleteTableRowFunction()"></td></tr>';
      var rows = audioStreamsTable.rows;
    }
  });
}

// INNER FUNCTIONS
function getVideos(videoTable) {
  let videos = new Array();
  for (var i = 0, row; (row = videoTable.tBodies[0].rows[i]); i++) {
    const video = getVideoStreamParams(row);
    if (video) {
      videos.push(video);
    }
  }
  if (videos.length === 0) {
    return null;
  }
  return videos;
}
function getVideoStreamParams(videoRow) {
  let sizeMB =
    videoRow.getElementsByClassName('video-size')[0].value != ''
      ? videoRow.getElementsByClassName('video-size')[0].value * 1
      : null;
  if (sizeMB === 0) {
    sizeMB = null;
  }
  if (sizeMB) {
    if (videoRow.getElementsByClassName('video-size-type')[0].value === 'GB') {
      sizeMB = sizeMB * 1024;
    }
  }
  const codec =
    videoRow.getElementsByClassName('video-codec')[0].value.trim() != ''
      ? videoRow.getElementsByClassName('video-codec')[0].value
      : null;
  const resW =
    videoRow.getElementsByClassName('video-res-w')[0].value != ''
      ? videoRow.getElementsByClassName('video-res-w')[0].value
      : null;
  const resH =
    videoRow.getElementsByClassName('video-res-h')[0].value != ''
      ? videoRow.getElementsByClassName('video-res-h')[0].value
      : null;
  let scanType = videoRow.getElementsByClassName('video-scan')[0].value;
  if (!resH && !resW) scanType = null;
  const colors =
    videoRow.getElementsByClassName('video-colors')[0].value != ''
      ? videoRow.getElementsByClassName('video-colors')[0].value * 1
      : null;
  const chroma =
    videoRow.getElementsByClassName('video-chroma')[0].value != ''
      ? videoRow.getElementsByClassName('video-chroma')[0].value
      : null;
  const fps =
    videoRow.getElementsByClassName('video-fps')[0].value != ''
      ? videoRow.getElementsByClassName('video-fps')[0].value * 1
      : null;
  let bitrate =
    videoRow.getElementsByClassName('video-bitrate')[0].value != ''
      ? videoRow.getElementsByClassName('video-bitrate')[0].value * 1
      : null;
  if (bitrate === 0) {
    bitrate = null;
  }
  if (
    sizeMB ||
    codec ||
    resW ||
    resH ||
    scanType ||
    colors ||
    chroma ||
    fps ||
    bitrate
  ) {
    return new Object({
      sizeMB,
      codec,
      resW,
      resH,
      scanType,
      chroma,
      colors,
      fps,
      bitrate
    });
  }

  return undefined;
}
function getAudios(audioTable) {
  let audios = new Array();
  for (var i = 0, row; (row = audioTable.tBodies[0].rows[i]); i++) {
    const audio = getAudioStreamParams(row);
    if (audio) {
      audios.push(audio);
    }
  }
  if (audios.length === 0) {
    return null;
  }
  return audios;
}
function getAudioStreamParams(audioRow) {
  let sizeMB =
    audioRow.getElementsByClassName('audio-size')[0].value != ''
      ? audioRow.getElementsByClassName('audio-size')[0].value * 1
      : null;
  if (sizeMB === 0) {
    sizeMB = null;
  }
  if (sizeMB) {
    if (audioRow.getElementsByClassName('audio-size-type')[0].value == 'GB') {
      sizeMB = sizeMB * 1024;
    }
  }
  const language =
    audioRow.getElementsByClassName('audio-language')[0].value.trim() !=
    'Unknown'
      ? audioRow.getElementsByClassName('audio-language')[0].value
      : null;
  const codec =
    audioRow.getElementsByClassName('audio-codec')[0].value.trim() != 'Unknown'
      ? audioRow.getElementsByClassName('audio-codec')[0].value
      : null;
  let channels =
    audioRow.getElementsByClassName('audio-channels')[0].value != ''
      ? audioRow.getElementsByClassName('audio-channels')[0].value * 1
      : null;
  if (channels === 0) {
    channels = null;
  }
  let bitrate =
    audioRow.getElementsByClassName('audio-bitrate')[0].value != ''
      ? audioRow.getElementsByClassName('audio-bitrate')[0].value * 1
      : null;
  if (bitrate === 0) {
    bitrate = null;
  }
  let bitDepth =
    audioRow.getElementsByClassName('audio-depth')[0].value != ''
      ? audioRow.getElementsByClassName('audio-depth')[0].value * 1
      : null;
  if (bitDepth === 0) {
    bitDepth = null;
  }
  let sampleRate =
    audioRow.getElementsByClassName('audio-sample')[0].value != ''
      ? audioRow.getElementsByClassName('audio-sample')[0].value * 1
      : null;
  if (sampleRate === 0) {
    sampleRate = null;
  }
  if (
    sizeMB ||
    language ||
    codec ||
    channels ||
    bitrate ||
    bitDepth ||
    sampleRate
  ) {
    return new Object({
      sizeMB,
      language,
      codec,
      channels,
      bitrate,
      bitDepth,
      sampleRate
    });
  }

  return undefined;
}
