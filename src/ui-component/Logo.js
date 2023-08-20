// material-ui
// import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  // const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */
    <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 38" width="40" height="38">
      <title>preview</title>
      <defs>
        <image
          width="84"
          height="84"
          id="img1"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IB2cksfwAADLhJREFUeJztm3lQFFcex51kU5sytVub7B+bym7FeGuIB6JEo8Ycxo2amFOTjcbVeEajicaoFeMVjLfxAkVBURQ8iAcgRhEMXoRDRAGR4VZArhmYi7lnvvt+PQwMgoqT7h7X6u/Ur6a75/Wv+/d5v/deH2/aAGjLzEcyXqxtm/oFSfzIRwLKrySgPEsCyrMkoDxLAsqzJKA8SwLKsySgPEsCyrMkoDxLAsqzJKA8SwLKsx4OoBabHcVaC67WmJGiMD2QpSnNyFVboLfYPR0GybNALTYbzuZV4eNDGWgfkIKnNybjqQ2tt7+vvYCBiw5i7Pwg+K3ai/TfkmDT6z0VDslzQI1mK9YcScLTEwMh+3TrA1vbMRvg13sY4p7viEvt2iOlUyekefdG6ZJFsKpqPRESyTNA7ax1Bp5KR9vR6yF7b5VbNq7vxzj3z3ZIfKEDBzP9xW7I6uUFuW9vVK9ZAbvJJHZYJM8AzSlVov30HZB9uNYte3bkYsS068LBTO3SuRFm354ofMUbpf8eDOPFBLHDIokP1Gy14cugOMjG/OymbcAi77cbYF716t4EZsmQfqgY2h+qudNg16jEDI0kPtCE7FI8PYn1m//Z7Jb1HLkA5zt0aoCZ7f1SM5iKEYOg+uA1mKIOsSOKOvqLC1RrMGP4umjIPvd3y54YtwU7eg1uAjPXt1dzmO8NhvqDQdDOGA1beYlY4ZHEBRp6SY4nJ++EbEKgWzZi+KxmMIsG9mkRpvqjV6Ae0x+GkPWA1SpWiOIBra0zYcBPxyGbHOSWPT5pB4719OVgXu/NYPZzwCx9zRflDGb1cAZzlAvM0f2h/sQXmulvwVaSL0aIJPGAhv6ehyemh0A2dZdb9u6ob5qN5s7MrB4+ELUNMAcymAMYzJeh/qwf1ON8YNizknWlNjHCFAdouVoPLz+WnTP2umV/mROGi5+MbREmNfN7wVSP92Z96UBY89KFDpMkDtClMdcgm7XfbVsdmwX91XTI+919ALobTM3EXtBO6gH95mnsms0gdKjCA80qV+HZxccgm3PALeu4IhpGi6O5Vi1b5BZM7VQvaGb0gCX1hJChkoQFSk+RxoUnQTbvsNt2LLO0wZ+1qhKV77zefDS/H8zp3Vmz74q6le/ArlUIFS5JWKApJTX469JIyBYeccuGBl1o5lMfHtLs0qg1MLVfdYb2644wJ4YLFS5JWKCrzuVCtui4W/anxZHIqFA3d2oyQjP1o0aYn/q2DubsjtDN7QDD7klCjvjCAv3v0XS0WXLCLZt5IvOufs2X4hphju3bapi6hZ1hCHgfdkMLFcWPhAU670wGZD+efGB7Zt0ZKPT3fvxWt3xaPcw+rYZZt6QbDDs//P8FGpGTj2c2xEK24vQD2axT2ff1bUliWfp5XwfMCQzmFwzmFAZzWndovmQwZzKYszpCO4fBnN8JdT90hd7vRRjDJrDRzSxUyMICLdYoMSchAe22x+OxNXFos/r+9uzW86jUteLhsM2KujXTHJnZSpiGNT1hueQvVLgkYYEarRYcyb+C5cln8WFUPHz2xaNXaDx67ImH1544dA+JQ5fdZ9BpVyw6BMeifVAsJsWm4NTNYpwsLsKJoiJEFRbiWEEh81OAiLwCHMzNR7g8H/tz8hB6OhKKKb1bDdMYNAx2haD39cJf2BeqFdhyLQGr0+LxY0ocfkiKxfxLpzHnwinMTDiJKWdjMOFMND47HYUxv0bi/ZhIjIg+hqHHj2LI0V8wICICPgcPo0f4QXTbdxAd9h7Av0LC8I/gffjbzlAEfD8Wiukv3R/m5j6wJAcKfU8vPFArC+BEUZZgQDtsCUDk/OH3hrnJG6aDn8CuqxIyVJI49/IVeg22ZFwQBOhT2/fizXXLUfqN111hGgMHwCqPFjpMkjhA7eyTUJYPv1RhgD7lvwtblo5uGea2vjD/OptdvNYJHSZJvOehapMB2zITBQH654A96LZhLW4s7dcMpin0DdjLL4sRIkncVyBpVaVYmhwnCNDHNwXj25UToVvTqxFm8MuwJq5ml1gWsUIUF6jBYkFARpIgQB9jQJ/7yQ+ZGwbDGOADU5AvzIeGw14jFys8kvivkdOqyrAwMVYQoDK/dZi7cqwD5l42EKWsFevVh1PiAzWxO5wdWamCAfVaPBtlu16FJZLds2tFfYVM8sxUnDyVEgsSzwgCtMvib3Br3xuwyQ+IHRbJM0Btdju7hcwUBOjrK2bCcHYmawqCPVG6lzw3nVFjNmL9ld95B7p1/3zmvMgTIZE8O+FWazYhNCcDk+Nj/jDQJ7eGYEJUDBRaj80NJT0cU8KVBgMu3i5BVGE+juTn4nCeHAdy5QiT5yD0Rg5Csm8g+Ho2dmZlY3vmdfhnXMeWq1nYmJ6Fzez7QG4BSrQ6T4dBejiAPkKSgPIsCSjP4gcozUqWlylbnNpaWatDWn45rt+shsHceE9ttdmRd7sGidklyL5VzflwSqM3Ib2ggjPNHS/rShUa7liuVq2uQ3Glqsm28hodKtixbyu1DftWsXK3qtS4yexOH+o64x/FQOIHaEm1Bs+N38zNFHGKlqKTc9H/2xD0nxsCn6+DMf7nSC5Ik8WK1RGJ6DlzJ15mv/WZHYw1vyTCxvbPKVVgyIJQ+M7ZzdlrC0MhL1U2+P02OA6D5u/FC1/4w5vtR8vbYi7jrR/C8dKMHejz9S7OloadQ3RKLt78fj8HW6nV432/CGyNSsWULTHcfp2nbGP77OSWT6by8mqEH6B0wm1GrmgC9Fa1mgvYPzqVy9KcEgWGsaAXhf6G+GtF6DJ1G05fKYCKZQZl6I0SxxSZoYv246vtp7jMIpu57Ve2LazBb5WqjsuwrlO3I/BkGrdM1ntWEHafucb5Ibtdo4XBZMEXm6IxdWsMFu9LwDvLDqJGa0AFy17aZwRbX7jnLLesM/DyJlQ4oGfSC+E9KxhKTeMfsQ6dv44BLGO/2xWHz9dHws7umCKT5FxQqyMu4UpBOR5/dyVKWLN29U3bdIamTZ8y65eLN7jlWp2RA/qe32GuMsgoO0kF5bXw+nIHnp+wFSnysiY+Pl51hGspPEpYoL2+CmL9WyPQsIQsvDJvD+YxoOM3OIBSU5sdeJprrkcTczh45M+pgvIaPDFqJeqMTTOoJaDkc1nYec7OslZAon6467TtHNBYdk6ueuiBXi2sRGZxVYNRhlLfWFSh4gamIQv3YXn4eQ52p8kBHJAiti+BpO7ht4xi1heGcc00nw1YZBM2RmEka5p3qiWg/icuI5llIRllJnUno348jAUh8dgUmYxB3+1FmbIx+x9aoDTydmF9GmWf006lFeA0s1fnh3IDjw8bKKYHnISCdQE0KFGANFDRwEPfFBiNtDTyD1scjn71g9LwJQdYhTS/nRy57BB3DJKmzsQ19x5skOvNKpFsyf5zOHDuOj5YEYFKlQ5a1mVM3BiNjceTuZZBopax4xSvM5v5umyysprXNjG90XGJVKszcINOIYPiemlEQdGlDV1OUYXY7I3dhZ4NJjTak9HA0pJocHL+RvvSuuvx6bjUf9O3nfsAWnYJRpdYTqA0QGkNvP6FkacM1dW0uqzRaobKxM8/hlvjx8COV23QolIvyuM8foAWqKugNRtwu07F1T4FQX/dJtF0HJrsUKXXQGHQcdvNNC/JYkJFnRqa+nnvJlaunO1Pb0dJeuaDKspks3AZWKarhcbUOEeeYF6pugmd2chln5L5rjWyrLWYufKV7HgEkraRX/JH50LnQNudLaLGqOPK8iR+gGbX3EaJtgZ6Bimnthz5DDCdKIm239IqOaBaFryyPoDLlUUczGKNgvuNKkXPYFDwChYw+STwBC63toKDUWNsfLdOlZSnquTAkA8CRX6uKm6hiK0TSDruTbZMPumcyA9VOpWTs+USVmFUEXReherqP4qBxA9QOjmnCEyBC1AKSlsPjoKqYE2PgNIyicoRGAJIZZ3wyYpYkLSusxi55VxVRX1v6JATQj7b3/X4+SqHbweoqgagVLnUEqiiaD1LWdZwTDIexA9QykqCSidFwRBAWr/J1ikTqWkXaRxAqMydQKl/48prlBxcZ/ZRM7/BQNM3wchUlDZ0JaRMZSmXwfQ7gSR41xQlXIbTOaWxLoGadxOgtkagjvOo5Cqbp36dH6DUb9LH5DKhwLFubRhRLWyZYNjrf3Nut7uY2aU8yeAyMZYyy/VKgETgbS7+aZ18kx+SyuToP6kElXP17dyP9rHw96r50Xx8R10B9ZX0Tdkqoh5NoCQa/Q3CTf2+mx5doB6SBJRnSUB5lgSUZ0lAeZYElGdJQHmWBJRnSUB5lgSUZ0lAeZYElGdJQHmWBJRn+fwPPwPYmFr7kCUAAAAASUVORK5CYII="
        />
      </defs>
      <style></style>
      <use id="Background" href="#img1" x="-22" y="-14" />
    </svg>
  );
};

export default Logo;