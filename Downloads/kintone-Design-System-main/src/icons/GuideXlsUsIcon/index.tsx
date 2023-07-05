import React from 'react';
import styled from 'styled-components';
import { useComponentId } from '../../hooks/useComponentId';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => {
  const id = useComponentId();
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="54" height="54" fill="#D8D8D8" fillOpacity="0.01" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 23L27 54H54V31.4581L45.4278 23H27Z"
        fill="#357064"
      />
      <path
        d="M29 1H7C3.68629 1 1 3.68629 1 7V29C1 32.3137 3.68629 35 7 35H29C32.3137 35 35 32.3137 35 29V7C35 3.68629 32.3137 1 29 1Z"
        fill="#D8D8D8"
        stroke="white"
        strokeWidth="2"
      />
      <rect x="2" y="2" width="32" height="32" rx="5" fill={`url(#${id}-1)`} />
      <path
        d="M50.5156 50H47.4531L44.7266 45.8047L41.9453 50H39.1406L43.2969 44.0859L39.2266 38.2266H42.2812L44.9375 42.2656L47.6562 38.2266H50.4766L46.375 43.9844L50.5156 50Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45 24V32H53L45 24Z"
        fill="white"
      />
      <defs>
        <pattern
          id={`${id}-1`}
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref={`#${id}-2`} transform="scale(0.0138889)" />
        </pattern>
        <image
          id={`${id}-2`}
          width="72"
          height="72"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAADMlJREFUeAHtW+lvXNUV/711FnvssRPvdhwnMcSYkBhCoCqL2qZUBVqoukC/t1Klfquqfq76rf0H+FAhJFohVaUgoIWCEKUJdCNkL9ljOxPH29gZe/blzes5d/LGbzbPZOaN7Uo+0uTdd+9995778znnnnPujTTz7pdNbFNFBOSKLdsNAoFtgKoIwjZA2wBVQaBK87YEbQNUBYEqzdsStA1QFQSqNG9L0FYESFK0KmyVNkuKWlq5ATWbIkGyrwty646alye37gRau5HN1vyJYx03BSAYabiGD9e8CG3XYQQCUVwLpJBIbmzouCkAmZkUFH8/lPY+ZIz1F6x2DEHr6EM6mRASFJhLbyhImwMQSZCg/gdx7UYa80uZ8tIkSdB3PyTaDAKIidVsI0HaHIBIgpg8nd3wD+1GaDWL+WApSFr3KGRvB0wzS1p5B9QNBmlTAEKWwKBFMw0cOgKJJCUULgJJVqAOTYg+RjIpnvZ/NkqSHAVI7Db2VaxTzmZyEpGllbrb/aKnHSSlpRPpeFzUZ1KlAHGDBVI8sWbHZPrOSZKczCgq/gHoAweQnD6BbCS4Lp8x1yDmpmaRTuRAsHf2+2T07FRxe9VAKO6Gx9+JlVsBe5eCMgkgBkd60XbPYcycO4P44k0M9qhQVWpokBz1vozQDIz2HngPfguZ4CRS058jmwiXZdEdvwnFTMOyLIrqgttH/g6pViS8CASTAiQzm8DiOuC42zuEmrItu3X2BEIzOSBvzGWwq7dxkBwFiJFI3TgFpa0H6s4RqDuGkZ67hFTgNMx0bhey0JJJufdMHIV78Gm0do5BUTuoae0vbmRWkAhfgWfufeDse1hcyhl263u9xYf+g4exY2SUPpOwSiDOnjtpNSOdNuEESI6qmMWdpHvhPfQcJM0tqiKBy0hc+QRuVw4A98CTaNv/U6h6Ly1kGplMgOzJEv2i1N+k9XqhKB2kIkP0242sEcbihZdx4fgfrSmw5/Gvo2N4j3hPRSO48O6fkLnjCuQ7UUHTpIYkqSkAMYNsjzzjTyEanMflD/8M08hgqM+N/id+Rdv7k0ilLiKZJMkyY/b1lJQlSYeuj8PlOoj46n9x8o2fIRVbhayquPcbz8NDKnbp/bcQXVoo+daqaASkpgHEzCk9+3H59GVkEgkougdHfvgyXN4BxGIfwTDmLP5resqyH17v18hDSOLE6z9GPDQH3duC1p5+LE9eqTpGvSA5us0Xc2nMX0SrzmZYwuEfvATd04to9O27BofHzWZD9O07kBQZD33vt1DdrSRJ0ZrA4e8tm5TJrLkEXF+NmgoQT96zQ8HBZ34Bj2+UJOd9WmikGk8V200zJcZQVC8OPffriv0qNdQDUtMBUttH0Dn8PBKJfwkpqMR8rfWmmUQ8/nf4djyMvvuO1vpZvp8AaTaDFO1ytVDTAWob+wmp1AqJeHU7UQvD3Mcw5mm8SYwc+VGtnxT0S5OaBWoEqW4/SFJ12sY9kMj4iidv6ZoXhuRCfGkWeniS7IUGl/8w7VYniMHa/mIFK1nnJZX6Ai0tz8DXNYLw4iR27huDr7cfabJLbJvS8RiVI0iJZ5RCv8JsG6dZGKShPhU6uQKVqD6AyNvlfI66cw84XwP2+mwUvLWIBfJk9058iXwaF/k5N22tzhRZikzyxHv2f0UApGgaOnfvKxicQVmdDeD29HUsT12tC6T6AMoaFEpMiV9gQYKnd7dgrq13QHi1qWgYsUQWSW2EGDYaMswFKy54MWncMLzt9AciYqlhsoMSCkxRmqTQAxedbP9Uk6T6ALJNINNfcenaJfFT3R4yyHvJR1kWPQyjsujmhmC1q9bHNllJMUtqrIva2HIQU//4G2oBpXiY9UBqGKC+bhUzpE4sMRmKzBcunc/Pn4zMU1kRasa7TwGRFMZOvSmqPAeeEbbM3m4mI4idexeSrME78RzhWKjG3FeWW5EQcwDJ8Ir42ce4m3IlkEpnvZtRmUkSgAGKmr3u0qFWZi+K0RSlq2TUbCoGk7xizt+kAqdK2pPTJ6H4umGmyMCmi8DleeUWAt6N6PJUybf1Vlgg2V2AhiWImbFAsiTJYjC8cJ225FUKOPtLDLXs9kGj3BFH+hJJh+RqzUuRmYojszQlhtF3TeTrrXH5qShk72hnnL/4Mb86RhZIvLtplE8q/bPXOZUFUrEkRZfPE0BsrEtJH3wALQ+/QAB4kaUckLEyh+zKPIzVeciedmp7USTgSr/kKH0EyfgN2s5XyzU3VGeBxP6SYwAxRwIkyuS5vJ48gzPn3xK2QlX78nX2gkSJMj7+kdu64R59HK7Rx0i1uoQbwb5WOeJ0iKoOIDj1Ub5Z83jzZScKAiSyrY4CxIzpXcMYe/YFeDpyJ6dzFz4WnrSmjVXkm09Zs9Hb+fZsdAkKn6ZWIF3fTz6QgenP/iB6tOzsxvi3X4R/V3lJrTBM1eps1kkJIjviGjkC9/6vUmrDhd7xQ3cYMBGc/CupxDDZmvJ/ZVanbHwlz3CW1Eb2tOXfCwsy5Yf2I7L0OZKRnDvROz4BdhT3PvEUBh98VNi0wm/qe5MpU+mIBEmuFngOPA2tfzzPSXv/EAGVU5Frn74izrZcrrX2fEcqMBhmwrIl5AASQJK7PECato8A8GDyP6+IITTyvVq7evLD9dx3EKNHn4UTKseeRcO7mNo5BH3f4+J0IkQOY4QyiNHFecRXSGXMXPyVjC4jNHcc/t7HKC47Q9WF3i3HcnxOxkfSfGYm4rwKN0BcrgNIRK9iaeqkAIVPRc68/ircbX6639BLYNGvuw9jT38X149/iMjCbB68uy1Q6qkxgDjnHE9kcPHN12CkChddzMzVT17Cw99/UqhHMnm2uFnsZGaafCM6luZdrRyp6i4y+H5MffabkubEagj8C17N+V4sQWybWN2NCudqJYMUVfBxUkMqxicVmeVbVcHheSOLUwgvnSSA7qc3pYgVcpRJisxknBzDRFm/hz9wuR6gSwwzmP3iw5Lviys4mhdhR53giPFIARoCiAfxuCXKGtamqdc+fUnYD13fV7yeOxLEAMUgU9qkmBSlh5zDHgTOvlbc1LR32sQaB4i587fRSWgNIN2+eQ7x8CWSogMli5I0F9mghAg/QOViYukxMrdx4/M3ipua8s7qxSFHwxJkcVcrSDdO/Y7sSLsIP6xv+clRucnn9WyD7kToVjvHXXxGNn/1HbLlhlXd1Ccn0XiPcQwg5rYWkG6d/4AkYZn8onsKF8i7FoFjGinaxQrvMGravcRsBtf/+WrhN018UzgsIHIUIB6wFpCC0x+JWIqjcYuEBBE4QooKtniJ+o4isny6KXGXNX/x04roHQeIJ6oG0uS/fy/44YXnSVFy6iNUbM0GqeqgiOUCp3NhRb5/EwusXhyLMTUFIB54PZDioVsIzX9C2/YhYY+4vyTTTkjH03ZiCXO7H0Eydh3zl47Zm5paVm1eSNMA4hWsB9K5v/wSMTr50PRnyQA/RS7rA8iaXfSX89GWP0F1R6ntO0iRb3Tm7Z83FRD74Hz+kEjlpIfrm3o2b00s7iCWuagZ1B9FUH/E6lb26TMmMRB/u2xbMyq95NfFbDfWavPwGuSEJYmjmuLbrBnKHC6tLKw7uuqm04rchrJuPycaeeNKFp24bghAzHw5kAzyb9xVEl2STAa78MzPCSzKjsH3l+zSw502DCCerBgkme4GJcvcUeS+Fpnu0oS91ebkk+8zlrvFv6EA8YIYJJl2rNlFSmdKCnTX2pZebsEKW80NkCDeuSgxUUIbDhBz0NZq2aTqYYOMMlyXLKOxCg8dWcXpXK8cbQpAzAiDdL95BZH4g0hLvnK8gU9t++KlZ2ZlO9dZyUc7yVR5cHjITQOIJ+/0pTFufIBjgTHSfzrLT1NWkVwQl0b5bV3GSMt16EqIuzaFeNfiqL3o4kfBXJsKEHMy7F+Acewc3jtGt1zvpGh5V79/byse/Wb5o6KCFTTw4qJdy35Lv9xQG+Iolpu4uG45ZGDxdnWbVPxdve98wMn3CaoRW8stQZ1+BV0dtiCoiVx5PbWBwyxsGYCYmY0ASUhOvLrkMD9Mm26Dcmys/csgMTmtbmyMc55y7eAwH1sOIGbKaZB4K2eAqhlknruYtpSK2ZlzSt341MWg4wkrQ2ifo5bylpQgi/FGJIljK420tR6psebn55aVIIvJu5UkDt14l8pSyjTuwH8h3/IAMVC1gCSAIXViWxOjXYoP/ZygLa1i9gVWUjdOsItInNKkxbkc+/f1lv9vAOIFMkgyBVCrEYMkRRKGl41vis4bm0Uq3YM806zBS8bNaUALST8fiHEiiJ98iYidn2I3muMOznXwtRHOmvEvTvmkmGGgKxjKNDdQo8mY/gdXZt/4FmdCBwAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export const GuideXlsUsIcon = styled(Component)``;
