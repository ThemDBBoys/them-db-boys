import { useState, useEffect } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://svklnqtitmmbrdgilrbh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2a2xucXRpdG1tYnJkZ2lscmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NTA0NzAsImV4cCI6MjA5MzMyNjQ3MH0.gWEcaW5JC5TlZmVX8KGVHEp7QWl1HZc4JjQN39QaPJA";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const G = "#F5C518";
const GD = "#c9a010";
const RED = "#E8192C";
const BG = "#060606";
const SURF = "#0e0e0e";
const CARD = "#111111";
const CARD2 = "#151515";
const BORDER = "#1c1c1c";
const GRAY = "#555";
const MID = "#888";
const LG = "#bbb";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,700&family=Barlow+Condensed:wght@400;600;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
html,body{background:${BG};color:#fff;font-family:'DM Sans',sans-serif;min-height:100vh;}
::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#1e1e1e;border-radius:2px;}
.app{max-width:430px;margin:0 auto;min-height:100vh;position:relative;overflow-x:hidden;}

/* NOISE OVERLAY */
.app::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.4;}

/* NAV */
.bnav{position:fixed;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;
  background:rgba(6,6,6,.97);border-bottom:1px solid ${BORDER};
  display:flex;justify-content:space-around;align-items:center;
  padding:14px 8px 12px;z-index:100;backdrop-filter:blur(16px);}
.ni{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;
  padding:6px 12px;transition:all .2s;border-radius:8px;position:relative;flex:1;}
.ni.act{background:rgba(245,197,24,.08);}
.ni.act .nico{color:${G};font-size:22px;}
.ni.act .nlbl{color:${G};}
.nico{font-size:20px;color:${GRAY};transition:all .2s;}
.nlbl{font-size:10px;font-family:'Barlow Condensed',sans-serif;font-weight:700;color:${GRAY};
  text-transform:uppercase;letter-spacing:.08em;transition:color .2s;}
.nbadge{position:absolute;top:4px;right:14px;background:${G};color:#000;
  font-size:8px;font-weight:900;width:14px;height:14px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;}

.page{padding-top:80px;padding-bottom:24px;min-height:100vh;position:relative;z-index:1;}

/* ═══ HERO ═══ */
.hero{position:relative;overflow:hidden;padding:0;background:${BG};}
.hero-bg{position:absolute;inset:0;background:
  radial-gradient(ellipse 80% 60% at 80% 20%, rgba(245,197,24,.09) 0%, transparent 60%),
  radial-gradient(ellipse 60% 40% at 10% 80%, rgba(232,25,44,.06) 0%, transparent 60%);
}
.hero-lines{position:absolute;inset:0;background-image:
  repeating-linear-gradient(90deg, rgba(255,255,255,.012) 0px, rgba(255,255,255,.012) 1px, transparent 1px, transparent 40px);
}
.hero-inner{position:relative;z-index:2;padding:24px 20px 32px;}
.eyebrow{display:inline-flex;align-items:center;gap:6px;margin-bottom:14px;
  background:rgba(245,197,24,.07);border:1px solid rgba(245,197,24,.2);
  border-radius:2px;padding:5px 12px;}
.eyebrow span{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;
  color:${G};letter-spacing:.14em;text-transform:uppercase;}
.brand{font-family:'Bebas Neue',sans-serif;font-size:62px;line-height:.88;
  color:#fff;letter-spacing:.01em;margin-bottom:8px;}
.brand em{color:${G};font-style:normal;}
.tagline{font-size:14px;color:${LG};line-height:1.6;margin-bottom:6px;font-style:italic;
  border-left:3px solid ${G};padding-left:12px;max-width:320px;}
.cred-strip{display:flex;align-items:center;gap:0;margin:18px 0 22px;overflow:hidden;border-radius:4px;border:1px solid ${BORDER};}
.cred{flex:1;text-align:center;padding:10px 4px;background:${CARD};border-right:1px solid ${BORDER};}
.cred:last-child{border-right:none;}
.cred-n{font-family:'Bebas Neue',sans-serif;font-size:24px;color:${G};line-height:1;}
.cred-l{font-size:9px;color:${GRAY};font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-top:2px;}
.hero-cta{background:${G};color:#000;border:none;cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;
  padding:15px 32px;border-radius:2px;transition:all .2s;display:inline-flex;align-items:center;gap:10px;}
.hero-cta:hover{background:${GD};transform:translateY(-1px);box-shadow:0 8px 24px rgba(245,197,24,.25);}

/* MOM BANNER */
.mom-banner{margin:0 16px;background:linear-gradient(135deg,#130f00,#1a1400);
  border:1px solid rgba(245,197,24,.2);border-radius:8px;padding:18px;
  position:relative;overflow:hidden;}
.mom-banner::before{content:'';position:absolute;top:-30px;right:-30px;
  width:120px;height:120px;background:radial-gradient(circle,rgba(245,197,24,.1) 0%,transparent 70%);border-radius:50%;}
.mom-label{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;
  color:${G};letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px;
  display:flex;align-items:center;gap:6px;}
.mom-label::before{content:'';width:16px;height:1px;background:${G};}
.mom-quote{font-size:15px;color:#fff;line-height:1.6;font-weight:500;}
.mom-quote em{color:${G};font-style:italic;}

/* SECTIONS */
.sec{padding:24px 16px 0;}
.sec-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.sec-ttl{font-family:'Bebas Neue',sans-serif;font-size:22px;color:#fff;letter-spacing:.04em;}
.sec-ttl em{color:${G};font-style:normal;}
.see-all{font-size:10px;color:${G};font-weight:700;text-transform:uppercase;letter-spacing:.08em;cursor:pointer;}

/* VIDEO CARDS */
.vrow{display:flex;gap:11px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
.vrow::-webkit-scrollbar{display:none;}
.vcard{flex-shrink:0;width:190px;background:${CARD2};border:1px solid ${BORDER};
  border-radius:6px;overflow:hidden;cursor:pointer;transition:all .25s;}
.vcard:hover{border-color:rgba(245,197,24,.35);transform:translateY(-3px);
  box-shadow:0 12px 32px rgba(0,0,0,.5);}
.vthumb{height:106px;position:relative;background:#0e0e0e;overflow:hidden;}
.vthumb img{width:100%;height:100%;object-fit:cover;opacity:.75;transition:opacity .3s;}
.vcard:hover .vthumb img{opacity:.9;}
.vplay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
.vplay-btn{width:36px;height:36px;background:${G};border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 24px rgba(245,197,24,.6);transition:transform .2s;}
.vcard:hover .vplay-btn{transform:scale(1.1);}
.vplay-btn::after{content:'▶';font-size:12px;color:#000;margin-left:2px;}
.vbadge{position:absolute;top:7px;left:7px;font-size:9px;font-weight:800;
  letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:2px;z-index:2;}
.vbadge.free{background:${G};color:#000;}
.vbadge.unlocked{background:${G};color:#000;}
.vbadge.lock{background:rgba(0,0,0,.7);color:${LG};border:1px solid ${BORDER};}
.vinfo{padding:10px;}
.vttl{font-size:12px;font-weight:700;line-height:1.35;margin-bottom:3px;color:#fff;}
.vmeta{font-size:10px;color:${MID};display:flex;gap:8px;}

/* CONTENT CATEGORY PILLS */
.cat-row{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;margin-bottom:16px;}
.cat-row::-webkit-scrollbar{display:none;}
.cat-pill{flex-shrink:0;padding:7px 14px;border:1px solid ${BORDER};border-radius:20px;
  font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;
  letter-spacing:.05em;text-transform:uppercase;cursor:pointer;transition:all .2s;color:${MID};}
.cat-pill.act{background:${G};border-color:${G};color:#000;}
.cat-pill:hover:not(.act){border-color:rgba(245,197,24,.3);color:${LG};}

/* VIDEO LIST ITEM */
.vli{display:flex;gap:12px;padding:13px;background:${CARD};border:1px solid ${BORDER};
  border-radius:7px;margin-bottom:8px;cursor:pointer;transition:all .2s;align-items:center;}
.vli:hover{border-color:rgba(245,197,24,.25);background:${CARD2};}
.vli-thumb{width:72px;height:44px;border-radius:4px;overflow:hidden;flex-shrink:0;position:relative;background:#0e0e0e;}
.vli-thumb img{width:100%;height:100%;object-fit:cover;}
.vli-lock{position:absolute;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;font-size:14px;}
.vli-info{flex:1;}
.vli-ttl{font-size:13px;font-weight:700;line-height:1.3;margin-bottom:3px;}
.vli-meta{font-size:11px;color:${MID};}
.vli-badge{font-size:9px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;padding:2px 6px;border-radius:2px;}
.vli-badge.free{background:rgba(245,197,24,.12);color:${G};}
.vli-badge.lock{background:rgba(255,255,255,.05);color:${MID};}
.vli-badge.unlocked{background:rgba(34,197,94,.1);color:#22c55e;}

/* COURSE CARD */
.course-card{background:linear-gradient(145deg,${CARD},${CARD2});
  border:1px solid ${BORDER};border-radius:10px;padding:20px;
  margin:0 16px 14px;position:relative;overflow:hidden;cursor:pointer;transition:all .2s;}
.course-card:hover{border-color:rgba(245,197,24,.25);}
.course-card::after{content:'97';position:absolute;right:-10px;bottom:-20px;
  font-family:'Bebas Neue',sans-serif;font-size:120px;color:rgba(245,197,24,.03);
  line-height:1;pointer-events:none;}
.fire-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(232,25,44,.1);
  border:1px solid rgba(232,25,44,.3);border-radius:2px;padding:3px 8px;margin-bottom:10px;}
.fire-badge span{font-size:10px;font-weight:800;color:${RED};letter-spacing:.1em;text-transform:uppercase;}
.course-ttl{font-family:'Bebas Neue',sans-serif;font-size:32px;line-height:.95;margin-bottom:6px;}
.course-ttl em{color:${G};font-style:normal;}
.course-hook{font-size:13px;color:${LG};line-height:1.6;margin-bottom:14px;
  border-left:2px solid rgba(245,197,24,.4);padding-left:10px;font-style:italic;}
.course-includes{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
.ci{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:${LG};line-height:1.4;}
.ci-check{color:${G};font-size:13px;flex-shrink:0;margin-top:1px;}
.course-footer{display:flex;align-items:center;justify-content:space-between;}
.price-wrap{display:flex;flex-direction:column;}
.p-old{font-size:12px;color:${GRAY};text-decoration:line-through;}
.p-new{font-family:'Bebas Neue',sans-serif;font-size:40px;color:${G};line-height:1;}
.buy-btn{background:${G};color:#000;border:none;cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:900;
  letter-spacing:.1em;text-transform:uppercase;padding:13px 20px;border-radius:2px;transition:all .2s;}
.buy-btn:hover{background:${GD};}

/* MOM'S CORNER */
.moms-corner{background:linear-gradient(135deg,#0d0d0d,#111);
  border:1px solid ${BORDER};border-radius:10px;margin:0 16px 14px;overflow:hidden;}
.mc-header{background:linear-gradient(90deg,rgba(245,197,24,.08),transparent);
  padding:16px;border-bottom:1px solid ${BORDER};
  display:flex;align-items:center;gap:10px;}
.mc-icon{width:40px;height:40px;background:rgba(245,197,24,.1);border:1px solid rgba(245,197,24,.2);
  border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px;}
.mc-label{font-family:'Bebas Neue',sans-serif;font-size:22px;color:#fff;}
.mc-sub{font-size:11px;color:${MID};margin-top:1px;}
.mc-items{padding:12px;}
.mc-item{display:flex;align-items:flex-start;gap:10px;padding:10px;margin-bottom:6px;
  background:rgba(255,255,255,.02);border:1px solid ${BORDER};border-radius:6px;
  cursor:pointer;transition:all .2s;}
.mc-item:hover{border-color:rgba(245,197,24,.2);}
.mc-item:last-child{margin-bottom:0;}
.mc-item-icon{font-size:18px;flex-shrink:0;margin-top:1px;}
.mc-item-ttl{font-size:13px;font-weight:700;margin-bottom:2px;}
.mc-item-desc{font-size:11px;color:${MID};line-height:1.4;}

/* BOOK */
.bkcard{background:${CARD};border:1px solid ${BORDER};border-radius:8px;margin:0 16px 10px;overflow:hidden;transition:all .2s;}
.bkcard:hover{border-color:rgba(245,197,24,.25);}
.bkhdr{padding:14px 16px;display:flex;align-items:center;gap:12px;
  background:linear-gradient(90deg,${CARD2},${CARD});}
.bkicon{width:44px;height:44px;background:rgba(245,197,24,.07);border:1px solid rgba(245,197,24,.15);
  border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.bkname{font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:900;letter-spacing:.02em;}
.bkspots{font-size:11px;color:${MID};margin-top:2px;}
.bkspots.hot{color:${RED};font-weight:700;}
.bkfoot{padding:10px 16px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid ${BORDER};}
.bkprice{font-family:'Bebas Neue',sans-serif;font-size:28px;color:${G};}
.bklbl{font-size:10px;color:${GRAY};}
.bk-btn{background:transparent;color:${G};border:1px solid rgba(245,197,24,.4);cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  padding:8px 14px;border-radius:2px;transition:all .2s;}
.bk-btn:hover{background:${G};color:#000;}

/* DRILLS */
.drpwrap{margin:0 16px 18px;}
.drphdr{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:7px;}
.drplbl{font-size:12px;color:${LG};font-weight:600;}
.drpcnt{font-family:'Bebas Neue',sans-serif;font-size:24px;color:${G};}
.drpbar{height:4px;background:${BORDER};border-radius:2px;overflow:hidden;}
.drpfill{height:100%;background:linear-gradient(90deg,${G},#ffdd44);border-radius:2px;transition:width .5s ease;}
.drcat{margin:0 16px 18px;}
.drcattl{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;color:${GRAY};
  text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px;
  display:flex;align-items:center;gap:8px;}
.drcattl::after{content:'';flex:1;height:1px;background:${BORDER};}
.dri{background:${CARD};border:1px solid ${BORDER};border-radius:6px;padding:12px;margin-bottom:7px;
  display:flex;align-items:center;gap:10px;cursor:pointer;transition:all .2s;}
.dri:hover{border-color:rgba(245,197,24,.2);}
.dri.done{background:rgba(245,197,24,.03);border-color:rgba(245,197,24,.12);}
.drchk{width:21px;height:21px;border-radius:4px;border:1.5px solid ${BORDER};
  display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;}
.drchk.on{background:${G};border-color:${G};}
.drchk.on::after{content:'✓';font-size:11px;color:#000;font-weight:900;}
.drinf{flex:1;}
.drn{font-size:13px;font-weight:700;margin-bottom:3px;}
.drn.done{color:${GRAY};text-decoration:line-through;}
.drtags{display:flex;gap:5px;flex-wrap:wrap;}
.drtag{font-size:9px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
  padding:2px 5px;border-radius:2px;background:rgba(255,255,255,.04);color:${GRAY};}
.drtag.hard{background:rgba(232,25,44,.1);color:${RED};}
.drtag.gold{background:rgba(245,197,24,.1);color:${G};}
.drxp{font-family:'Bebas Neue',sans-serif;font-size:16px;color:${G};flex-shrink:0;}

/* AUTH */
.auth-wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:32px 24px;background:${BG};position:relative;overflow:hidden;}
.auth-wrap::before{content:'';position:absolute;top:-100px;left:50%;transform:translateX(-50%);
  width:400px;height:400px;background:radial-gradient(circle,rgba(245,197,24,.05) 0%,transparent 65%);border-radius:50%;}
.auth-brand{font-family:'Bebas Neue',sans-serif;font-size:48px;color:#fff;text-align:center;line-height:.9;margin-bottom:4px;}
.auth-brand em{color:${G};font-style:normal;}
.auth-tagline{font-size:11px;color:${MID};text-align:center;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;}
.auth-hook{font-size:13px;color:${LG};text-align:center;font-style:italic;line-height:1.5;
  margin-bottom:28px;max-width:300px;padding:10px 14px;
  background:rgba(245,197,24,.05);border:1px solid rgba(245,197,24,.12);border-radius:4px;}
.auth-card{width:100%;max-width:360px;background:${CARD};border:1px solid ${BORDER};border-radius:8px;padding:22px;}
.auth-title{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:900;
  letter-spacing:.05em;text-transform:uppercase;margin-bottom:16px;color:#fff;}
.auth-field{margin-bottom:11px;}
.auth-label{font-size:10px;font-weight:700;color:${GRAY};text-transform:uppercase;letter-spacing:.1em;margin-bottom:5px;display:block;}
.auth-input{width:100%;background:#0a0a0a;border:1px solid ${BORDER};border-radius:4px;
  padding:11px 13px;color:#fff;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border .2s;}
.auth-input:focus{border-color:rgba(245,197,24,.35);}
.role-row{display:flex;gap:7px;margin-bottom:13px;}
.role-btn{flex:1;padding:9px;border-radius:4px;border:1px solid ${BORDER};background:transparent;
  color:${MID};font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;
  letter-spacing:.05em;text-transform:uppercase;cursor:pointer;transition:all .2s;}
.role-btn.sel{background:rgba(245,197,24,.08);border-color:rgba(245,197,24,.4);color:${G};}
.auth-btn{width:100%;background:${G};color:#000;border:none;cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:900;
  letter-spacing:.12em;text-transform:uppercase;padding:14px;border-radius:4px;margin-top:4px;transition:all .2s;}
.auth-btn:hover{background:${GD};}
.auth-switch{font-size:12px;color:${MID};text-align:center;margin-top:13px;cursor:pointer;}
.auth-switch span{color:${G};font-weight:700;}

/* MODAL */
.mo{position:fixed;inset:0;background:rgba(0,0,0,.9);display:flex;align-items:flex-end;
  justify-content:center;z-index:200;backdrop-filter:blur(8px);animation:fi .2s ease;}
.mbox{background:${SURF};border:1px solid ${BORDER};border-radius:12px 12px 0 0;
  padding:22px;width:100%;max-width:430px;animation:su .3s ease;position:relative;max-height:88vh;overflow-y:auto;}
.mhnd{width:28px;height:3px;background:${BORDER};border-radius:2px;margin:0 auto 18px;}
.mttl{font-family:'Bebas Neue',sans-serif;font-size:26px;margin-bottom:2px;}
.msub{font-size:12px;color:${MID};margin-bottom:16px;line-height:1.5;}
.mclose{position:absolute;top:14px;right:14px;background:${BORDER};border:none;color:${LG};
  width:26px;height:26px;border-radius:50%;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;}
.time-slots{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:14px;}
.tslot{padding:7px 12px;border:1px solid ${BORDER};border-radius:3px;font-size:12px;
  font-weight:600;cursor:pointer;transition:all .2s;color:${LG};}
.tslot.sel{background:${G};border-color:${G};color:#000;}
.stripe-wrap{background:#080808;border:1px solid ${BORDER};border-radius:6px;padding:14px;margin-bottom:12px;}
.stripe-row{display:flex;gap:9px;}
.sf{flex:1;margin-bottom:9px;}
.sf:last-child{margin-bottom:0;}
.slbl{font-size:10px;font-weight:700;color:${GRAY};text-transform:uppercase;letter-spacing:.09em;margin-bottom:4px;display:block;}
.sinput{width:100%;background:#0c0c0c;border:1px solid #222;border-radius:3px;
  padding:10px 11px;color:#fff;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border .2s;}
.sinput:focus{border-color:rgba(245,197,24,.35);}
.stripe-sec{display:flex;align-items:center;gap:7px;font-size:11px;color:${GRAY};margin-bottom:12px;}
.stripe-logo{font-size:10px;font-weight:900;color:#6772e5;background:rgba(103,114,229,.1);padding:2px 7px;border-radius:3px;}
.confirm-btn{width:100%;background:${G};color:#000;border:none;cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:900;
  letter-spacing:.12em;text-transform:uppercase;padding:15px;border-radius:4px;transition:all .2s;}
.confirm-btn:hover{background:${GD};}
.confirm-btn:disabled{background:${BORDER};color:${GRAY};cursor:not-allowed;}

/* YT MODAL */
.yt-mo{position:fixed;inset:0;background:rgba(0,0,0,.97);display:flex;align-items:center;
  justify-content:center;z-index:200;animation:fi .2s ease;padding:12px;}
.yt-box{width:100%;max-width:430px;background:${SURF};border:1px solid ${BORDER};border-radius:10px;overflow:hidden;}
.yt-frame{width:100%;aspect-ratio:16/9;background:#000;position:relative;overflow:hidden;}
.yt-frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:none;}
.yt-info{padding:14px;}
.yt-ttl{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:900;margin-bottom:4px;}
.yt-desc{font-size:12px;color:${MID};line-height:1.5;margin-bottom:12px;}
.yt-close{width:100%;background:${BORDER};color:${LG};border:none;cursor:pointer;
  padding:11px;border-radius:4px;font-family:'Barlow Condensed',sans-serif;
  font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;transition:all .2s;}
.yt-close:hover{background:#222;}

/* TOAST */
.toast{position:fixed;top:18px;left:50%;transform:translateX(-50%);
  background:${G};color:#000;padding:10px 18px;border-radius:6px;
  font-weight:800;font-size:13px;z-index:300;letter-spacing:.03em;white-space:nowrap;
  animation:ti .25s ease;box-shadow:0 4px 20px rgba(245,197,24,.3);}

/* SUCCESS */
.success-wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;
  justify-content:center;padding:32px;text-align:center;background:${BG};}
.success-icon{font-size:58px;margin-bottom:16px;animation:pop .4s ease;}
.success-ttl{font-family:'Bebas Neue',sans-serif;font-size:38px;color:${G};margin-bottom:8px;}
.success-msg{font-size:14px;color:${LG};line-height:1.7;margin-bottom:24px;max-width:300px;}
.success-btn{background:${G};color:#000;border:none;cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:900;
  letter-spacing:.1em;text-transform:uppercase;padding:14px 28px;border-radius:3px;}

/* COACH DASH */
.dash-hdr{background:${CARD};padding:48px 20px 20px;border-bottom:1px solid ${BORDER};}
.dash-stats{display:flex;gap:0;margin-top:16px;}
.dstat{flex:1;text-align:center;padding:12px 0;background:#0e0e0e;border:1px solid ${BORDER};}
.dstat:first-child{border-radius:5px 0 0 5px;}
.dstat:last-child{border-radius:0 5px 5px 0;}
.dstat-n{font-family:'Bebas Neue',sans-serif;font-size:26px;color:${G};line-height:1;}
.dstat-l{font-size:9px;color:${GRAY};font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:2px;}
.bk-row{display:flex;align-items:center;gap:10px;padding:13px 16px;background:${CARD};
  border:1px solid ${BORDER};border-radius:7px;margin:0 16px 8px;transition:all .2s;}
.bk-row:hover{border-color:rgba(245,197,24,.15);}
.bk-ath{font-size:13px;font-weight:700;}
.bk-info{font-size:11px;color:${MID};margin-top:2px;}
.bk-status{font-size:9px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:3px 7px;border-radius:2px;}
.bk-status.confirmed{background:rgba(34,197,94,.1);color:#22c55e;}
.bk-status.pending{background:rgba(245,197,24,.1);color:${G};}
.bk-price{font-family:'Bebas Neue',sans-serif;font-size:18px;color:${G};margin-left:6px;}

@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes su{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes ti{from{opacity:0;transform:translateX(-50%) translateY(-6px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
@keyframes pop{0%{transform:scale(.4)}70%{transform:scale(1.15)}100%{transform:scale(1)}}
`;

const YT = [
  { id: "SzxYM6tovLo", isShort: false, cat: "training", title: "Intro — Who is Stefan & Why He Built This", dur: "Short", free: true, views: "", desc: "Stefan Black II — D1 cornerback, Blue Springs, MO. 13 scholarship offers. 8 years at the position. Watch this first before any drill video." },
  { id: "iolAI1YKVCk", cat: "training", title: "Video 1 — Backpedal Stance & Start", dur: "3–4 min", free: true, views: "", desc: "The foundation coaches look for first on film. Weight on balls of feet. Chin over toes. Most youth corners have never been taught this correctly." },
  { id: "FiI9ZVdgPro", cat: "training", title: "Video 2 — The 45-Degree Break", dur: "3–4 min", free: true, views: "", desc: "Plant the outside foot. Explode at 45 degrees. Stefan shows the wrong way first then the right way so your son knows exactly what to fix." },
  { id: "bK_FXz-F1HE", cat: "training", title: "Video 3 — Hip Flip Left & Right", dur: "3–4 min", free: true, views: "", desc: "The move that separates recruited corners from everyone else. Both directions — because every player has a weak side." },
  { id: "XufZ5FT2EAQ", cat: "training", title: "Video 4 — Trail Technique", dur: "3–4 min", free: true, views: "", desc: "Stay on the receiver's hip. Run the route with them. Attack the ball at the catch point. What elite corners do when they get beat off the line and refuse to give up the play." },
  { id: "SbT8WVOwxEc", cat: "mindset", title: "Video 5 — Mental Reset Protocol", dur: "3–4 min", free: true, views: "", desc: "Three breaths. One cue word. Walk to the line fast. The exact routine Stefan used every time he got beaten at every level." },
  { id: "2vjPBrBU-TM", cat: "mindset", title: "Staying Coachable When It Gets Hard", dur: "6:15", free: false, views: "7.1K", desc: "The mental trait every college coach is looking for. Most kids don't have it." },
  { id: "dQw4w9WgXcQ", cat: "recruiting", title: "What College Coaches Look for in a Cornerback", dur: "11:20", free: false, views: "19.5K", desc: "Stefan breaks down exactly what got him recruited — and what almost cost him." },
  { id: "L_jWHffIx5E", cat: "recruiting", title: "How to Build Your Highlight Tape", dur: "9:05", free: false, views: "8.4K", desc: "Which plays to put in. Which to leave out. How to send it the right way." },
  { id: "o-YBDTqX_ZU", cat: "grades", title: "NCAA Eligibility — What Your Son Needs to Know Now", dur: "7:45", free: false, views: "22.1K", desc: "One C in the wrong class can end a recruiting process before it starts. Know the rules." },
  { id: "ktvTqknDobU", cat: "grades", title: "Managing School & Training — A Real Plan", dur: "5:30", free: false, views: "6.3K", desc: "How Stefan balanced D1 practice schedules and stayed academically eligible." },
];

const SESSIONS = [
  { id: 1, icon: "⚡", title: "1-on-1 Private Training", duration: "60 min", price: 120, spots: "3 left", hot: true },
  { id: 2, icon: "👥", title: "Small Group (4 players)", duration: "90 min", price: 55, spots: "2 left", hot: true },
  { id: 3, icon: "🎥", title: "Virtual Film Review", duration: "45 min", price: 65, spots: "Open", hot: false },
  { id: 4, icon: "🏟️", title: "Weekend Camp KC", duration: "Full Day", price: 149, spots: "8 left", hot: false },
];

const DRILLS = {
  "Week 1 — Foundation · Mon–Sat · Rest Sunday · Slow & Correct": [
    { id: 1, name: "Mon — 🔥 Stretch → 🪜 Ladder → 📺 V1: Backpedal Stance · 5 reps · 📺 V2: 45-Degree Break · 5 reps each side · 📺 V3: Hip Flip L&R · 5 reps each · 📺 V4: Trail Technique · 5 reps each side · 📺 V5: Mental Reset · 5 reps", tag: "All 5 Drills" },
    { id: 2, name: "Tue — 🔥 Stretch → 🪜 Ladder → 📺 V1: Backpedal · 5 reps · 📺 V2: 45° Break · 5 reps each · 📺 V3: Hip Flip L&R · 5 reps each · 📺 V4: Trail · 5 reps each · 📺 V5: Mental Reset · 5 reps · Film yourself today", tag: "All 5 Drills" },
    { id: 3, name: "Wed — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Focus: keep pad level low on backpedal", tag: "All 5 Drills" },
    { id: 4, name: "Thu — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Focus: plant foot on the break and hip flip", tag: "All 5 Drills" },
    { id: 5, name: "Fri — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Focus: trail technique — stay on the hip", tag: "All 5 Drills" },
    { id: 6, name: "Sat — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Film ALL drills today · Compare to Monday", tag: "Film Day" },
    { id: 7, name: "Sun — REST. No drills. Light stretch only. Let your body adapt. You earned it.", tag: "Rest" },
  ],
  "Week 2 — Build Speed · Mon–Sat · Rest Sunday · 75% Speed": [
    { id: 8, name: "Mon — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills at 75% speed · 5 reps each · Feel the difference from Week 1", tag: "All 5 Drills" },
    { id: 9, name: "Tue — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Focus: hip flip weak side — do it twice as much as strong side", tag: "All 5 Drills" },
    { id: 10, name: "Wed — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Film yourself · Write 1 thing that improved from Week 1", tag: "All 5 Drills" },
    { id: 11, name: "Thu — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Add a cone or partner for trail technique today", tag: "All 5 Drills" },
    { id: 12, name: "Fri — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Focus: mental reset — get beaten on purpose then reset fast", tag: "All 5 Drills" },
    { id: 13, name: "Sat — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills at full speed ⚡ · 5 reps each · Film everything", tag: "Film Day" },
    { id: 14, name: "Sun — REST. Review film. Write 1 thing you want to fix next week. Rest fully.", tag: "Rest" },
  ],
  "Week 3 — Game Speed · Mon–Sat · Rest Sunday · Full Speed": [
    { id: 15, name: "Mon — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills at FULL game speed ⚡ · 5 reps each · No slowing down", tag: "All 5 Drills" },
    { id: 16, name: "Tue — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Add partner for trail technique and mental reset reps", tag: "All 5 Drills" },
    { id: 17, name: "Wed — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Film yourself · Compare to Week 1 film", tag: "All 5 Drills" },
    { id: 18, name: "Thu — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills at full speed · 5 reps each · Focus: press stance hold 3 seconds each rep", tag: "All 5 Drills" },
    { id: 19, name: "Fri — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Focus: mental reset in live coverage — get beaten 5 times and reset each rep", tag: "All 5 Drills" },
    { id: 20, name: "Sat — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills at max speed ⚡ · 5 reps each · Film everything — this is potential recruiting tape", tag: "Film Day" },
    { id: 21, name: "Sun — REST. 3 weeks done. Your body is building. Rest fully. Week 4 is the proving ground.", tag: "Rest" },
  ],
  "Week 4 — Prove It · Mon–Sat · Rest Sunday · Recruiting Tape": [
    { id: 22, name: "Mon — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills at max speed · 5 reps each · Time your backpedal and break ⚡", tag: "All 5 Drills" },
    { id: 23, name: "Tue — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Hip flip both sides should feel equal now — if not, add 5 more weak side reps", tag: "All 5 Drills" },
    { id: 24, name: "Wed — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → FILM SESSION ⚡🎥 All 5 drills · 5 reps each · Every rep on camera · This is your recruiting tape", tag: "Recruit Tape" },
    { id: 25, name: "Thu — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · YouTube: 'double move routes DB' — watch 10 reps and write the tell", tag: "All 5 Drills" },
    { id: 26, name: "Fri — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → All 5 drills · 5 reps each · Add open field tackling form · 5 reps · Head up · Wrap and drive", tag: "All 5 Drills" },
    { id: 27, name: "Sat — 🔥 Stretch → 🪜 Ladder → 📺 V1–V5 → FULL SHOWCASE 🏆⚡ All 5 drills · 5 reps each · Mental reset after every single rep · Film everything", tag: "Complete" },
    { id: 28, name: "Sun — REST. Watch Day 1 film next to today's film. That difference is 30 days of real work. Share it with Stefan. 🏆", tag: "Done" },
  ],
};

const BOOKINGS_INIT = [
  { id: 101, athlete: "Marcus T.", session: "1-on-1 Private Training", date: "Mar 15", time: "10:00 AM", status: "confirmed", price: 120 },
  { id: 102, athlete: "Jaylen W.", session: "Small Group", date: "Mar 15", time: "1:00 PM", status: "confirmed", price: 55 },
  { id: 103, athlete: "DeAndre S.", session: "Virtual Film Review", date: "Mar 16", time: "3:00 PM", status: "pending", price: 65 },
  { id: 104, athlete: "Cameron R.", session: "1-on-1 Private Training", date: "Mar 17", time: "9:30 AM", status: "confirmed", price: 120 },
  { id: 105, athlete: "Tyrese M.", session: "Weekend Camp", date: "Mar 22", time: "8:00 AM", status: "pending", price: 149 },
];

const CATS = ["all", "training", "mindset", "recruiting", "grades"];
const CAT_LABELS = { all: "All Videos", training: "DB Training", mindset: "Mindset", recruiting: "Recruiting", grades: "Grades & Eligibility" };

const MOM_ITEMS = [
  { icon: "🎓", title: "The Recruiting Timeline", desc: "When coaches start looking, what they want to see, and how to make sure your son is ready at each stage." },
  { icon: "📋", title: "NCAA Eligibility Explained", desc: "Core GPA, credit hours, the classes that count. One mistake here ends a scholarship before it starts." },
  { icon: "🎥", title: "How to Evaluate a Trainer", desc: "Questions to ask. Red flags to watch for. How to know if your son is actually being developed." },
  { icon: "📱", title: "How to Support Without Overcoaching", desc: "What coaches and trainers need parents to understand. This one matters more than most think." },
  { icon: "🏫", title: "Local KC Camps & Exposure Events", desc: "Where the right eyes will actually be. The events that move the needle for KC athletes." },
];

export default function App() {
  const [screen, setScreen] = useState("auth");
  const [authMode, setAuthMode] = useState("login");
  const [role, setRole] = useState("athlete");
  const [tab, setTab] = useState("home");
  const [user, setUser] = useState(null);
  const [accessLevel, setAccessLevel] = useState(1); // 1=Starter Kit, 2=Mini Course, 3=Blueprint
  const [openCourse, setOpenCourse] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const [bookModal, setBookModal] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);
  const [ytModal, setYtModal] = useState(null);
  const [stripeStep, setStripeStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [bookings, setBookings] = useState(BOOKINGS_INIT);
  const [payForm, setPayForm] = useState({ card: "", exp: "", cvv: "", name: "" });
  const [hasCourse, setHasCourse] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [vidCat, setVidCat] = useState("all");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // Load access level from Supabase for a user
  async function loadAccessLevel(userId) {
    try {
      const { data } = await supabase
        .from('user_access')
        .select('access_level')
        .eq('user_id', userId)
        .single();
      if (data) setAccessLevel(data.access_level);
    } catch (err) {
      setAccessLevel(1); // default to starter kit
    }
  }

  // Save access level to Supabase
  async function saveAccessLevel(userId, level) {
    try {
      await supabase.from('user_access').upsert({
        user_id: userId,
        access_level: level,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
      setAccessLevel(level);
    } catch (err) {
      console.log('Access level save error:', err);
    }
  }

  useEffect(() => {
    // Check URL for access parameter from Stan Store redirect
    const params = new URLSearchParams(window.location.search);
    const accessParam = params.get('access');

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        setUser({ name: session.user.email, role: "athlete" });
        setScreen("app");
        // If coming from Stan Store with access param — save the new level
        if (accessParam) {
          const newLevel = parseInt(accessParam);
          if (newLevel >= 1 && newLevel <= 3) {
            await saveAccessLevel(session.user.id, newLevel);
          }
          // Clean URL
          window.history.replaceState({}, '', window.location.pathname);
        } else {
          // Load existing access level from Supabase
          await loadAccessLevel(session.user.id);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setUser({ name: session.user.email, role: "athlete" });
        setScreen("app");
        await loadAccessLevel(session.user.id);
      } else if (!session) {
        setUser(null);
        setScreen("auth");
        setAccessLevel(1);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      if (authMode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
        if (error) setAuthError(error.message);
      } else {
        const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
        if (error) setAuthError(error.message);
        else setAuthError("Check your email to confirm your account then sign in.");
      }
    } catch (err) {
      setAuthError("Something went wrong. Please try again.");
    }
    setAuthLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setScreen("auth");
    setUser(null);
    setTab("home");
  }

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2800); }

  function toggleDrill(id) {
    setCompleted(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function handlePay() {
    if (!payForm.card || !payForm.exp || !payForm.cvv || !payForm.name) return;
    const isCourse = bookModal?.course;
    const sess = bookModal;
    setBookModal(null); setTimeSlot(null); setStripeStep(1);
    setPayForm({ card: "", exp: "", cvv: "", name: "" });
    if (isCourse) {
      setHasCourse(true);
      setSuccessMsg({ icon: "🔒", title: "ACCESS UNLOCKED", msg: "The Cornerback Blueprint is yours. All training videos, the recruiting roadmap, mindset modules, and grades guide are now open. Let's get to work.", btn: "Start Training" });
    } else {
      setBookings(prev => [{ id: Date.now(), athlete: user?.name || "You", session: sess?.title, date: "Mar 20", time: timeSlot, status: "confirmed", price: sess?.price }, ...prev]);
      setSuccessMsg({ icon: "✅", title: "SESSION BOOKED", msg: `${sess?.title} confirmed for ${timeSlot}. Stefan will see you on the field. Check your email for details.`, btn: "Back to App" });
    }
    setScreen("success");
  }

  const filteredVids = vidCat === "all" ? YT : YT.filter(v => v.cat === vidCat);
  const totalDrills = Object.values(DRILLS).flat().length;
  const doneCount = completed.size;

  // AUTH
  if (screen === "auth") return (
    <>
      <style>{css}</style>
      <div className="app">
        {toast && <div className="toast">{toast}</div>}
        <div className="auth-wrap">
          <div className="auth-brand">THEM <em>DB</em><br />BOYS</div>
          <div className="auth-tagline">D1 DB Training · Kansas City</div>
          <div className="auth-hook">
            "Your son has the talent. We give him the training, the roadmap, and the reason to stay locked in."
          </div>

          {/* OTP CODE ENTRY SCREEN */}
          {otpSent ? (
            <div className="auth-card">
              <div className="auth-title">Check Your Email</div>
              <div style={{fontSize:13, color:MID, marginBottom:16, lineHeight:1.6}}>
                We sent an 6-digit code to <strong style={{color:"#fff"}}>{otpEmail}</strong>. Enter it below along with your new password.
              </div>
              <div className="auth-field">
                <label className="auth-label">8-Digit Code</label>
                <input className="auth-input" type="text" placeholder="123456" maxLength={6}
                  value={otpCode} onChange={e => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  style={{letterSpacing:"0.3em", fontSize:20, textAlign:"center"}} />
              </div>
              <div className="auth-field">
                <label className="auth-label">New Password</label>
                <input className="auth-input" type="password" placeholder="Enter new password"
                  value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              {authError && (
                <div style={{fontSize:12, color: authError.includes("✅") ? "#22c55e" : "#ee5566",
                  marginBottom:10, padding:"8px 12px", background:"rgba(255,255,255,.05)", borderRadius:4, lineHeight:1.5}}>{authError}</div>
              )}
              <button className="auth-btn" disabled={authLoading} onClick={async () => {
                if (!otpCode || otpCode.length < 6) { setAuthError("Enter the 6-digit code from your email."); return; }
                if (!newPassword || newPassword.length < 6) { setAuthError("Password must be at least 6 characters."); return; }
                setAuthLoading(true);
                setAuthError("");
                const { error: verifyError } = await supabase.auth.verifyOtp({
                  email: otpEmail,
                  token: otpCode,
                  type: "magiclink"
                });
                if (verifyError) { setAuthError(verifyError.message); setAuthLoading(false); return; }
                const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
                setAuthLoading(false);
                if (updateError) setAuthError(updateError.message);
                else {
                  setAuthError("✅ Password updated! Signing you in...");
                  setOtpSent(false);
                  setOtpCode("");
                  setNewPassword("");
                  setTimeout(async () => {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session) {
                      setUser({ name: session.user.email, role: "athlete" });
                      setScreen("app");
                    }
                  }, 1500);
                }
              }}>
                {authLoading ? "Verifying..." : "Verify Code & Save Password →"}
              </button>
              <div style={{textAlign:"center", marginTop:12}}>
                <span style={{fontSize:12, color:MID, cursor:"pointer"}}
                  onClick={() => { setOtpSent(false); setOtpCode(""); setAuthError(""); }}>
                  ← Back to Sign In
                </span>
              </div>
            </div>

          ) : (
          <div className="auth-card">
            <div className="auth-title">{authMode === "login" ? "Sign In" : "Create Account"}</div>
            <div style={{ marginBottom: 12 }}>
              <div className="auth-label">I am a...</div>
              <div className="role-row">
                <button className={`role-btn${role === "athlete" ? " sel" : ""}`} onClick={() => setRole("athlete")}>🏈 Athlete / Parent</button>
                <button className={`role-btn${role === "coach" ? " sel" : ""}`} onClick={() => setRole("coach")}>📋 Coach Stefan</button>
              </div>
            </div>
            <form onSubmit={handleLogin}>
              {authMode === "signup" && (
                <div className="auth-field">
                  <label className="auth-label">Full Name</label>
                  <input className="auth-input" placeholder="Marcus Thompson" />
                </div>
              )}
              <div className="auth-field">
                <label className="auth-label">Email</label>
                <input className="auth-input" type="email" placeholder="you@example.com"
                  value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
              </div>
              <div className="auth-field">
                <label className="auth-label">Password</label>
                <input className="auth-input" type="password" placeholder="••••••••"
                  value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
              </div>
              {authError && (
                <div style={{fontSize:12, color: authError.includes("Check your email") || authError.includes("reset") ? "#22c55e" : "#ee5566",
                  marginBottom:10, padding:"8px 12px", background:"rgba(255,255,255,.05)",
                  borderRadius:4, lineHeight:1.5}}>{authError}</div>
              )}
              <button type="submit" className="auth-btn" onClick={handleLogin} disabled={authLoading}>
                {authLoading ? "Please wait..." : authMode === "login" ? "Sign In →" : "Create Account →"}
              </button>
              {authMode === "login" && (
                <div style={{textAlign:"center", marginTop:12}}>
                  <span
                    style={{fontSize:12, color:G, cursor:"pointer", textDecoration:"underline"}}
                    onClick={async () => {
                      if (!authEmail) { setAuthError("Enter your email above first then click Forgot Password."); return; }
                      setAuthLoading(true);
                      setAuthError("");
                      const { error } = await supabase.auth.signInWithOtp({
                        email: authEmail,
                        options: { 
                          shouldCreateUser: false,
                          emailRedirectTo: undefined
                        }
                      });
                      setAuthLoading(false);
                      if (error) setAuthError(error.message);
                      else {
                        setOtpEmail(authEmail);
                        setOtpSent(true);
                        setAuthError("✅ Check your email for an 6-digit code.");
                      }
                    }}>
                    Forgot your password?
                  </span>
                </div>
              )}
            </form>
            <div className="auth-switch" onClick={() => setAuthMode(m => m === "login" ? "signup" : "login")}>
              {authMode === "login" ? <>New here? <span>Create a free account</span></> : <>Already have an account? <span>Sign in</span></>}
            </div>
          </div>
          )} {/* end !otpSent conditional */}
        </div>
      </div>
    </>
  );

  // SUCCESS
  if (screen === "success") return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="success-wrap">
          <div className="success-icon">{successMsg?.icon}</div>
          <div className="success-ttl">{successMsg?.title}</div>
          <div className="success-msg">{successMsg?.msg}</div>
          <button className="success-btn" onClick={() => { setScreen(user?.role === "coach" ? "coach" : "app"); setSuccessMsg(null); }}>{successMsg?.btn} →</button>
        </div>
      </div>
    </>
  );

  // COACH
  if (screen === "coach") return (
    <>
      <style>{css}</style>
      <div className="app">
        {toast && <div className="toast">{toast}</div>}
        <div className="page">
          <div className="dash-hdr">
            <div style={{ fontSize: 11, color: MID, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>Coach Dashboard</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 34, color: "#fff" }}>STEFAN <span style={{ color: G }}>BLACK II</span></div>
            <div style={{ fontSize: 12, color: MID }}>Them DB Boys · Kansas City, MO · 8 Years at the Position</div>
            <div className="dash-stats" style={{ marginTop: 16 }}>
              {[
                { n: bookings.filter(b => b.status === "confirmed").length, l: "Confirmed" },
                { n: bookings.filter(b => b.status === "pending").length, l: "Pending" },
                { n: `$${bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.price, 0)}`, l: "Revenue" },
                { n: bookings.length, l: "Total" },
              ].map((s, i) => (
                <div key={i} className="dstat">
                  <div className="dstat-n">{s.n}</div>
                  <div className="dstat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="sec">
            <div className="sec-hdr">
              <div className="sec-ttl">UPCOMING <span style={{ color: G }}>SESSIONS</span></div>
              <div className="see-all" onClick={() => showToast("📤 Export coming soon")}>Export</div>
            </div>
          </div>
          {bookings.map(b => (
            <div key={b.id} className="bk-row">
              <div style={{ flex: 1 }}>
                <div className="bk-ath">{b.athlete}</div>
                <div className="bk-info">{b.session} · {b.date} @ {b.time}</div>
              </div>
              <div className={`bk-status ${b.status}`}>{b.status}</div>
              <div className="bk-price">${b.price}</div>
              {b.status === "pending" && (
                <button style={{ background: G, color: "#000", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: 3, fontSize: 10, fontWeight: 800, marginLeft: 4 }}
                  onClick={() => { setBookings(p => p.map(x => x.id === b.id ? { ...x, status: "confirmed" } : x)); showToast("✅ Confirmed!"); }}>
                  ✓
                </button>
              )}
            </div>
          ))}
          <div className="sec" style={{ paddingTop: 20 }}>
            <div className="sec-hdr"><div className="sec-ttl">QUICK <span style={{ color: G }}>ACTIONS</span></div></div>
            {[
              { icon: "📤", label: "Upload Training Video", sub: "Add to the video library" },
              { icon: "💬", label: "Message Athletes", sub: "Group or 1-on-1" },
              { icon: "📊", label: "Revenue Report", sub: "Monthly breakdown" },
              { icon: "🚪", label: "Sign Out", sub: "Log out of dashboard" },
            ].map((a, i) => (
              <div key={i} className="bk-row" style={{ cursor: "pointer" }}
                onClick={() => a.label === "Sign Out" ? handleLogout() : showToast(`${a.icon} ${a.label} — coming soon`)}>
                <div style={{ fontSize: 20, width: 32, textAlign: "center" }}>{a.icon}</div>
                <div style={{ flex: 1 }}><div className="bk-ath" style={{ fontSize: 13 }}>{a.label}</div><div className="bk-info">{a.sub}</div></div>
                <div style={{ color: GRAY, fontSize: 14 }}>›</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // MAIN APP
  return (
    <>
      <style>{css}</style>
      <div className="app">
        {toast && <div className="toast">{toast}</div>}

        {/* ── HOME ── */}
        {tab === "home" && (
          <div className="page">
            {/* HERO */}
            <div className="hero">
              <div className="hero-bg" /><div className="hero-lines" />
              <div className="hero-inner">
                <div className="eyebrow"><span>🏈 DB Training · Kansas City</span></div>
                <div className="brand">THEM <em>DB</em><br />BOYS</div>
                <div className="tagline">
                  "Your son has the talent. We give him the training, the roadmap, and the reason to stay locked in."
                </div>
                <div style={{ fontSize: 12, color: MID, marginBottom: 18, lineHeight: 1.6, fontStyle: "italic" }}>
                  Coached by Stefan Black II — 4 years All-State at Blue Springs. 4 years D1. 8 years at the position.
                </div>
                <div className="cred-strip">
                  {[["4 YRS", "High School CB"], ["13", "Scholarship Offers"], ["4 YRS", "D1 Football"], ["8 YRS", "The Position"]].map(([n, l], i) => (
                    <div key={i} className="cred"><div className="cred-n">{n}</div><div className="cred-l">{l}</div></div>
                  ))}
                </div>
              </div>
            </div>

            {/* MOM BANNER */}
            <div style={{margin:"16px 16px 12px",background:"linear-gradient(135deg,#0f0c00,#1a1500)",border:`1px solid rgba(245,197,24,.2)`,borderRadius:10,padding:"20px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,background:"radial-gradient(circle,rgba(245,197,24,.08) 0%,transparent 70%)",borderRadius:"50%"}}/>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:20,height:1,background:G}}/>
                <div style={{fontSize:9,fontWeight:800,color:G,letterSpacing:".16em",textTransform:"uppercase"}}>For Every Mom Reading This</div>
              </div>
              <div style={{fontSize:15,color:"rgba(255,255,255,.9)",lineHeight:1.75,fontStyle:"italic",fontFamily:"Georgia,serif"}}>
                "Football isn't just a sport. It's a reason to keep his grades right, protect his future, and stay off the wrong path. <span style={{color:G,fontWeight:700}}>A scholarship changed our family.</span> This training exists so your son has the same shot."
              </div>
              <div style={{marginTop:12,fontSize:11,color:MID,fontWeight:600,letterSpacing:".06em"}}>— Stefan Black II · Them DB Boys</div>
            </div>

            {/* GO TO COURSES CTA */}
            <div style={{margin:"0 16px 20px"}}>
              <div style={{background:`linear-gradient(135deg,#111,#141200)`,border:`1px solid rgba(245,197,24,.25)`,borderRadius:10,overflow:"hidden"}}>
                {/* Gold top stripe */}
                <div style={{height:3,background:`linear-gradient(90deg,${G},${GD})`}}/>
                <div style={{padding:"18px 18px 18px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                    <div style={{width:40,height:40,borderRadius:8,background:G,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:20}}>📚</span>
                    </div>
                    <div>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"#fff",lineHeight:1}}>YOUR COURSES ARE READY</div>
                      <div style={{fontSize:11,color:MID,marginTop:2}}>1 unlocked · 2 available to upgrade</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:14}}>
                    {[
                      ["✅","$9 Cornerback Kit", accessLevel >= 1 ? "Unlocked" : "Locked", accessLevel >= 1],
                      ["📚","$27 Mini Course", accessLevel >= 2 ? "Unlocked" : "Locked", accessLevel >= 2],
                      ["🏆","$67 Blueprint", accessLevel >= 3 ? "Unlocked" : "Locked", accessLevel >= 3]
                    ].map(([icon,name,status,unlocked],i)=>(
                      <div key={i} style={{flex:1,background:unlocked?"rgba(245,197,24,.08)":"rgba(255,255,255,.03)",border:`1px solid ${unlocked?"rgba(245,197,24,.25)":BORDER}`,borderRadius:6,padding:"8px 6px",textAlign:"center"}}>
                        <div style={{fontSize:14,marginBottom:3}}>{unlocked ? "✅" : "🔒"}</div>
                        <div style={{fontSize:9,fontWeight:800,color:unlocked?"#fff":GRAY,letterSpacing:".04em",lineHeight:1.3}}>{name}</div>
                        <div style={{fontSize:8,color:unlocked?G:GRAY,marginTop:2,fontWeight:700}}>{status}</div>
                      </div>
                    ))}
                  </div>
                  <button style={{width:"100%",background:G,color:"#000",border:"none",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",padding:"14px",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}
                    onClick={()=>setTab("videos")}>
                    <span>📚</span> Go to My Courses ›
                  </button>
                </div>
              </div>
            </div>

            <div style={{ height: 20 }} />
          </div>
        )}

        {/* ── VIDEOS ── */}
        {tab === "videos" && (
          <div className="page">
            <div style={{padding:"20px 16px 16px"}}>
              <div className="sec-ttl" style={{fontSize:28}}>MY <em style={{color:G}}>COURSES</em></div>
              <div style={{fontSize:12,color:MID,marginTop:4}}>Everything you have unlocked — and what is waiting for you next.</div>
            </div>

            {/* ── COURSE 1 — STARTER KIT — UNLOCKED ── */}
            <div style={{margin:"0 16px 20px",borderRadius:10,overflow:"hidden",border:`1px solid rgba(245,197,24,.35)`,background:"linear-gradient(135deg,#111,#141200)"}}>
              <div style={{background:"linear-gradient(135deg,#1a1400,#111)",padding:"20px 18px 16px",borderBottom:`1px solid ${BORDER}`,position:"relative"}}>
                <div style={{position:"absolute",top:14,right:14,background:G,color:"#000",fontSize:9,fontWeight:900,letterSpacing:".1em",textTransform:"uppercase",padding:"3px 10px",borderRadius:2}}>✓ UNLOCKED</div>
                <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:".14em",textTransform:"uppercase",marginBottom:6}}>🏈 Course 01 · $9 · Cornerback Starter Kit</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:"#fff",lineHeight:1,marginBottom:6}}>CORNERBACK DAILY DRILL STARTER KIT</div>
                <div style={{fontSize:12,color:MID,lineHeight:1.5}}>The 5 foundation drills every recruited cornerback needs — plus the 30-day training plan. Your starting point.</div>
                <div style={{display:"flex",gap:12,marginTop:12,flexWrap:"wrap"}}>
                  <div style={{fontSize:11,color:LG}}>🎥 6 Videos</div>
                  <div style={{fontSize:11,color:LG}}>📋 30-Day Checklist</div>
                  <div style={{fontSize:11,color:LG}}>⏱ ~25 min total</div>
                </div>
              </div>
              <div style={{padding:"12px 18px"}}>
                {[
                  {id:"SzxYM6tovLo",title:"Intro — Who is Stefan & Why He Built This",dur:"2 min"},
                  {id:"iolAI1YKVCk",title:"Video 1 — Backpedal Stance & Start",dur:"3–4 min"},
                  {id:"FiI9ZVdgPro",title:"Video 2 — The 45-Degree Break",dur:"3–4 min"},
                  {id:"bK_FXz-F1HE",title:"Video 3 — Hip Flip Left & Right",dur:"3–4 min"},
                  {id:"XufZ5FT2EAQ",title:"Video 4 — Trail Technique",dur:"3–4 min"},
                  {id:"SbT8WVOwxEc",title:"Video 5 — Mental Reset Protocol",dur:"3–4 min"},
                ].map((v,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${BORDER}`,cursor:"pointer"}}
                    onClick={()=>window.open(`https://www.youtube.com/watch?v=${v.id}`,"_blank")}>
                    <div style={{width:32,height:32,borderRadius:6,background:G,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:12,color:"#000"}}>▶</span>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#fff",lineHeight:1.3}}>{v.title}</div>
                      <div style={{fontSize:11,color:MID,marginTop:2}}>⏱ {v.dur}</div>
                    </div>
                    <div style={{fontSize:9,fontWeight:800,color:G,letterSpacing:".08em",textTransform:"uppercase"}}>WATCH</div>
                  </div>
                ))}
                <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",cursor:"pointer"}}
                  onClick={()=>window.open("https://drive.google.com/file/d/1Pt4R6sCRYrD3iMfLnKXGA8qmAOson4-b/view?usp=sharing", "_blank")}>
                  <div style={{width:32,height:32,borderRadius:6,background:"rgba(245,197,24,.12)",border:`1px solid rgba(245,197,24,.25)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:16}}>📋</span>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#fff",lineHeight:1.3}}>30-Day Cornerback Checklist PDF</div>
                    <div style={{fontSize:11,color:MID,marginTop:2}}>Printable · Take it to the field</div>
                  </div>
                  <div style={{fontSize:9,fontWeight:800,color:G,letterSpacing:".08em",textTransform:"uppercase"}}>DOWNLOAD</div>
                </div>
              </div>
            </div>

            {/* ── COURSE 2 — CB FOUNDATIONS ── */}
            <div style={{margin:"0 16px 20px",borderRadius:10,overflow:"hidden",border:`1px solid ${accessLevel >= 2 ? "rgba(245,197,24,.35)" : BORDER}`,background:accessLevel >= 2 ? "linear-gradient(135deg,#111,#141200)" : CARD}}>
              <div style={{background:accessLevel >= 2 ? "linear-gradient(135deg,#1a1400,#111)" : CARD2,padding:"20px 18px 16px",borderBottom:`1px solid ${BORDER}`,position:"relative"}}>
                <div style={{position:"absolute",top:14,right:14,background:accessLevel >= 2 ? G : "rgba(255,255,255,.06)",color:accessLevel >= 2 ? "#000" : MID,fontSize:9,fontWeight:900,letterSpacing:".1em",textTransform:"uppercase",padding:"3px 10px",borderRadius:2,border:accessLevel >= 2 ? "none" : `1px solid ${BORDER}`}}>{accessLevel >= 2 ? "✓ UNLOCKED" : "🔒 LOCKED"}</div>
                <div style={{fontSize:10,fontWeight:700,color:accessLevel >= 2 ? G : MID,letterSpacing:".14em",textTransform:"uppercase",marginBottom:6}}>🏈 Course 02 · $27 · Cornerback Mini Course</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:accessLevel >= 2 ? "#fff" : LG,lineHeight:1,marginBottom:6}}>CORNERBACK FOUNDATIONS MINI COURSE</div>
                <div style={{fontSize:12,color:accessLevel >= 2 ? MID : GRAY,lineHeight:1.5}}>Take the foundation to game speed. Backpedal mastery, W drill, and press man stance. 4 advanced video modules.</div>
                <div style={{display:"flex",gap:12,marginTop:12,flexWrap:"wrap"}}>
                  <div style={{fontSize:11,color:accessLevel >= 2 ? LG : GRAY}}>🎥 4 Modules</div>
                  <div style={{fontSize:11,color:accessLevel >= 2 ? LG : GRAY}}>⚡ Game Speed</div>
                  <div style={{fontSize:11,color:accessLevel >= 2 ? LG : GRAY}}>👤 Advanced Technique</div>
                </div>
              </div>
              <div style={{padding:"12px 18px"}}>
                {[
                  {id:"B07dfCzYvNk", title:"V1 — Backpedal at Full Game Speed"},
                  {id:"tXy7W188Ou8", title:"V2 — Backpedal Mastery"},
                  {id:"0ue4nTrDlEg", title:"V3 — Backpedal The W Drill"},
                  {id:"nViR_3LJpAI", title:"V4 — Press Man Stance"},
                ].map((v,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<3?`1px solid ${BORDER}`:"none",cursor:accessLevel >= 2 ? "pointer" : "default",opacity:accessLevel >= 2 ? 1 : .55}}
                    onClick={()=>accessLevel >= 2 ? window.open(`https://www.youtube.com/watch?v=${v.id}`,"_blank") : null}>
                    <div style={{width:32,height:32,borderRadius:6,background:accessLevel >= 2 ? G : "rgba(255,255,255,.04)",border:accessLevel >= 2 ? "none" : `1px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:12,color:accessLevel >= 2 ? "#000" : GRAY}}>{accessLevel >= 2 ? "▶" : "🔒"}</span>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:accessLevel >= 2 ? "#fff" : MID,lineHeight:1.3}}>{v.title}</div>
                    </div>
                    {accessLevel >= 2 && <span style={{fontSize:9,fontWeight:800,color:G,letterSpacing:".08em",textTransform:"uppercase"}}>WATCH</span>}
                  </div>
                ))}
                {accessLevel < 2 && (
                  <button style={{width:"100%",marginTop:14,background:G,color:"#000",border:"none",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:900,letterSpacing:".1em",textTransform:"uppercase",padding:"13px",borderRadius:3}}
                    onClick={()=>window.open("https://stan.store/themdbboys/p/cornerback-foundations-mini-course","_blank")}>
                    Unlock This Course — $27 →
                  </button>
                )}
              </div>
            </div>

            {/* ── COURSE 3 — BLUEPRINT ── */}
            <div style={{margin:"0 16px 32px",borderRadius:10,overflow:"hidden",border:`1px solid ${accessLevel >= 3 ? "rgba(245,197,24,.35)" : "rgba(200,16,46,.2)"}`,background:accessLevel >= 3 ? "linear-gradient(135deg,#111,#141200)" : CARD}}>
              <div style={{background:accessLevel >= 3 ? "linear-gradient(135deg,#1a1400,#111)" : "linear-gradient(135deg,#110000,#111)",padding:"20px 18px 16px",borderBottom:`1px solid ${BORDER}`,position:"relative"}}>
                <div style={{position:"absolute",top:14,right:14,background:accessLevel >= 3 ? G : "rgba(200,16,46,.12)",color:accessLevel >= 3 ? "#000" : RED,fontSize:9,fontWeight:900,letterSpacing:".1em",textTransform:"uppercase",padding:"3px 10px",borderRadius:2,border:accessLevel >= 3 ? "none" : "1px solid rgba(200,16,46,.25)"}}>{accessLevel >= 3 ? "✓ UNLOCKED" : "🏆 UPGRADE"}</div>
                <div style={{fontSize:10,fontWeight:700,color:accessLevel >= 3 ? G : RED,letterSpacing:".14em",textTransform:"uppercase",marginBottom:6}}>🏆 Course 03 · $67 · The Blueprint</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:accessLevel >= 3 ? "#fff" : LG,lineHeight:1,marginBottom:6}}>THE CORNERBACK BLUEPRINT</div>
                <div style={{fontSize:12,color:accessLevel >= 3 ? MID : GRAY,lineHeight:1.5}}>7 complete cornerback modules. Press coverage, zone coverages, off man, route recognition, film study, getting recruited, and Parent's Corner.</div>
                <div style={{display:"flex",gap:12,marginTop:12,flexWrap:"wrap"}}>
                  <div style={{fontSize:11,color:accessLevel >= 3 ? LG : GRAY}}>🎥 7 Modules</div>
                  <div style={{fontSize:11,color:accessLevel >= 3 ? LG : GRAY}}>👩 Parent's Corner</div>
                  <div style={{fontSize:11,color:accessLevel >= 3 ? LG : GRAY}}>📍 Getting Recruited</div>
                  <div style={{fontSize:11,color:accessLevel >= 3 ? LG : GRAY}}>♾ Lifetime Access</div>
                </div>
              </div>
              <div style={{padding:"12px 18px"}}>
                {[
                  {id:"Nlr6BNkGFKU", title:"V1 — Full Press Man Coverage"},
                  {id:"fvT3uXaXj-o", title:"V2 — Cover 2 Tips & Tricks"},
                  {id:"wvl4LtIsYXQ", title:"V3 — Cover 3 Tips & Tricks"},
                  {id:"ImWddXADrLE", title:"V4 — Off Man Coverage Techniques"},
                  {id:"ax8vG6PqJik", title:"V5 — Getting Recruited"},
                  {id:"OMSnJ7QGyVg", title:"V6 — Route Recognition"},
                  {id:"j6An5sez0Dk", title:"V7 — Film Study Tips & Tricks"},
                ].map((v,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:i<6?`1px solid ${BORDER}`:"none",cursor:accessLevel >= 3 ? "pointer" : "default",opacity:accessLevel >= 3 ? 1 : .5}}
                    onClick={()=>accessLevel >= 3 ? window.open(`https://www.youtube.com/watch?v=${v.id}`,"_blank") : null}>
                    <div style={{width:32,height:32,borderRadius:6,background:accessLevel >= 3 ? G : "rgba(255,255,255,.03)",border:accessLevel >= 3 ? "none" : `1px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:12,color:accessLevel >= 3 ? "#000" : GRAY}}>{accessLevel >= 3 ? "▶" : "🔒"}</span>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:accessLevel >= 3 ? "#fff" : GRAY,lineHeight:1.3}}>{v.title}</div>
                    </div>
                    {accessLevel >= 3 && <span style={{fontSize:9,fontWeight:800,color:G,letterSpacing:".08em",textTransform:"uppercase"}}>WATCH</span>}
                  </div>
                ))}

                {/* MOM'S CORNER */}
                {accessLevel >= 3 ? (
                  <div style={{marginTop:14,background:"rgba(245,197,24,.06)",border:`1px solid rgba(245,197,24,.2)`,borderRadius:8,padding:"14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                      <span style={{fontSize:16}}>👨‍👩‍👦</span>
                      <div style={{fontSize:11,fontWeight:800,color:G,textTransform:"uppercase",letterSpacing:".08em"}}>Parent's Corner — Unlocked</div>
                    </div>

                    {/* SECTION 1 — RECRUITING TIMELINE */}
                    <div style={{marginBottom:16,padding:"12px",background:"rgba(0,0,0,.2)",borderRadius:6,borderLeft:`3px solid ${G}`}}>
                      <div style={{fontSize:11,fontWeight:900,color:G,letterSpacing:".12em",textTransform:"uppercase",marginBottom:8}}>📅 The Recruiting Timeline</div>
                      {[
                        {grade:"8th Grade",text:"Start position-specific training now. Run track if offered. Protect the GPA from day one. Play multiple sports to build athleticism."},
                        {grade:"9th Grade",text:"Register on the NCAA Eligibility Center at eligibilitycenter.org immediately. Every credit and grade counts now. Attend local 7-on-7 events. Start filming full game footage."},
                        {grade:"10th Grade",text:"Attend regional college camps — this is when coaches start building their boards. Build your first highlight tape on Hudl. Start emailing coaches at 15 to 20 target programs. Begin SAT/ACT prep now."},
                        {grade:"11th Grade",text:"This is the most critical recruiting year. Junior season film is the most heavily watched by coaches. Handle SAT/ACT scores in the fall. Start campus visits. Update highlight tape after the season."},
                        {grade:"12th Grade",text:"Early Signing Period is December. Most opportunities are committed by then. Do not let one failed class cost a scholarship. Compare offers carefully — a D2 starter beats a D1 benchwarmer."},
                      ].map((item,i)=>(
                        <div key={i} style={{padding:"8px 0",borderBottom:i<4?`1px solid rgba(255,255,255,.05)`:"none"}}>
                          <div style={{fontSize:11,fontWeight:800,color:"#fff",marginBottom:3}}>{item.grade}</div>
                          <div style={{fontSize:11,color:MID,lineHeight:1.6}}>{item.text}</div>
                        </div>
                      ))}
                    </div>

                    {/* SECTION 2 — NCAA ELIGIBILITY */}
                    <div style={{marginBottom:16,padding:"12px",background:"rgba(0,0,0,.2)",borderRadius:6,borderLeft:`3px solid ${G}`}}>
                      <div style={{fontSize:11,fontWeight:900,color:G,letterSpacing:".12em",textTransform:"uppercase",marginBottom:8}}>🎓 NCAA Eligibility — What You Must Know</div>
                      {[
                        "NCAA eligibility starts counting credits and GPA beginning in 9th grade — not when your son graduates",
                        "Division I requires 16 core courses in specific subjects — not just any classes",
                        "A minimum 2.3 GPA in core courses is required for D1 — higher GPA means full eligibility and more scholarship money",
                        "One failed core class can disqualify a player that coaches want to offer — this happens every single year",
                        "Register on the NCAA Eligibility Center at ncaa.org in 9th grade — coaches cannot officially recruit a player who is not registered",
                        "Division II requires a 2.2 GPA in 16 core courses — slightly lower bar but still requires planning from day one",
                      ].map((item,i)=>(
                        <div key={i} style={{fontSize:11,color:MID,lineHeight:1.6,padding:"6px 0",borderBottom:i<5?`1px solid rgba(255,255,255,.05)`:"none",display:"flex",gap:8}}>
                          <span style={{color:G,flexShrink:0}}>→</span>{item}
                        </div>
                      ))}
                    </div>

                    {/* SECTION 3 — SAT/ACT PREP */}
                    <div style={{marginBottom:16,padding:"12px",background:"rgba(0,0,0,.2)",borderRadius:6,borderLeft:`3px solid ${G}`}}>
                      <div style={{fontSize:11,fontWeight:900,color:G,letterSpacing:".12em",textTransform:"uppercase",marginBottom:8}}>📝 SAT/ACT Prep — Start in 10th Grade</div>
                      <div style={{fontSize:11,color:MID,lineHeight:1.6,marginBottom:8}}>A low test score can disqualify a player that coaches want to offer. Aim for a 23 or higher on the ACT for most D1 programs. A 27 opens even more doors.</div>
                      <div style={{fontSize:11,color:MID,lineHeight:1.6,marginBottom:8}}>Stefan's sister used PrepMedians to raise her score by 6 points. Start early and treat it like a position drill — reps every day adds up.</div>
                      <a href="https://www.prepmedians.com" target="_blank" style={{display:"inline-block",background:G,color:"#000",padding:"8px 16px",borderRadius:3,fontSize:11,fontWeight:900,textDecoration:"none",letterSpacing:".08em",textTransform:"uppercase"}}>Visit PrepMedians →</a>
                    </div>

                    {/* SECTION 4 — HOW TO EVALUATE A TRAINER */}
                    <div style={{marginBottom:16,padding:"12px",background:"rgba(0,0,0,.2)",borderRadius:6,borderLeft:`3px solid ${G}`}}>
                      <div style={{fontSize:11,fontWeight:900,color:G,letterSpacing:".12em",textTransform:"uppercase",marginBottom:8}}>🔍 How to Evaluate a Trainer</div>
                      {[
                        "Do they play or have they played at the position they are training — position specific experience matters",
                        "Do they teach technique or just run drills — technique coaching shows up on film, generic drills do not",
                        "Can they explain why each drill matters to college coaches — trainers who understand recruiting are worth 10x more",
                        "Do they have references from athletes who got offers or scholarships — results are the only thing that matters",
                        "Are they teaching your son to think on the field or just react — football IQ is what separates recruited players",
                      ].map((item,i)=>(
                        <div key={i} style={{fontSize:11,color:MID,lineHeight:1.6,padding:"6px 0",borderBottom:i<4?`1px solid rgba(255,255,255,.05)`:"none",display:"flex",gap:8}}>
                          <span style={{color:G,flexShrink:0}}>✦</span>{item}
                        </div>
                      ))}
                    </div>

                    {/* SECTION 5 — HOW TO SUPPORT WITHOUT OVERCOACHING */}
                    <div style={{marginBottom:16,padding:"12px",background:"rgba(0,0,0,.2)",borderRadius:6,borderLeft:`3px solid ${G}`}}>
                      <div style={{fontSize:11,fontWeight:900,color:G,letterSpacing:".12em",textTransform:"uppercase",marginBottom:8}}>💪 How to Support Without Overcoaching</div>
                      {[
                        {do:true,text:"Show up to games and practices consistently — your presence matters more than your coaching"},
                        {do:true,text:"Ask how he felt about his performance — let him lead the evaluation"},
                        {do:true,text:"Handle logistics — camps, emails to coaches, eligibility paperwork — this is your lane"},
                        {do:true,text:"Celebrate effort and consistency not just big plays"},
                        {do:false,text:"Do not coach him from the sideline during games — coaches notice and it reflects poorly"},
                        {do:false,text:"Do not contact coaches on his behalf — he needs to build those relationships himself"},
                        {do:false,text:"Do not compare him to other recruits — his path is his own"},
                      ].map((item,i)=>(
                        <div key={i} style={{fontSize:11,color:MID,lineHeight:1.6,padding:"6px 0",borderBottom:i<6?`1px solid rgba(255,255,255,.05)`:"none",display:"flex",gap:8,alignItems:"flex-start"}}>
                          <span style={{color:item.do?G:RED,flexShrink:0,fontWeight:900}}>{item.do?"✓":"✗"}</span>{item.text}
                        </div>
                      ))}
                    </div>

                    {/* SECTION 6 — CAMPS AND EXPOSURE EVENTS */}
                    <div style={{padding:"12px",background:"rgba(0,0,0,.2)",borderRadius:6,borderLeft:`3px solid ${G}`}}>
                      <div style={{fontSize:11,fontWeight:900,color:G,letterSpacing:".12em",textTransform:"uppercase",marginBottom:8}}>🏕️ Finding Local & Regional Camps</div>
                      <div style={{fontSize:11,color:MID,lineHeight:1.6,marginBottom:10}}>Start local — camps within driving distance are the best value for younger players. As your son develops move to regional exposure events where college coaches are watching.</div>

                      <div style={{fontSize:10,fontWeight:900,color:G,letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>Find Local Camps:</div>
                      {[
                        {name:"footballcampsusa.com",desc:"Search by state or zip code — best for finding local D1 D2 and NAIA prospect camps near you"},
                        {name:"ncsasports.org/football/camps",desc:"NCSA camp finder — search by location — also create a free recruiting profile so coaches can find your son"},
                        {name:"ryzer.com",desc:"Search upcoming college prospect camps by zip code"},
                      ].map((item,i)=>(
                        <div key={i} style={{padding:"6px 0",borderBottom:`1px solid rgba(255,255,255,.05)`}}>
                          <div style={{fontSize:11,fontWeight:800,color:"#fff"}}>{item.name}</div>
                          <div style={{fontSize:11,color:MID,lineHeight:1.5}}>{item.desc}</div>
                        </div>
                      ))}

                      <div style={{fontSize:10,fontWeight:900,color:G,letterSpacing:".1em",textTransform:"uppercase",margin:"10px 0 6px"}}>Regional & National Exposure Events:</div>
                      {[
                        {name:"Under Armour Next Camp Series",desc:"underarmournext.com — runs February through April nationally — top performers earn the right to play in the UA All-America Game"},
                        {name:"Rivals Camp Series",desc:"The nation's largest free high school football combine series — must earn nomination or be selected as top performer to qualify"},
                        {name:"Nike Football Camps",desc:"Dozens of camps in 12 states — ages 8 to 18 — usasportscamps.com"},
                        {name:"VTO Sports Elite 100 Showcase",desc:"vtosports.net — hosted at college stadiums — athletes can receive college offers onsite"},
                        {name:"EXACT Sports",desc:"exactsports.com — over 1000 NCAA coaches in their network — professional video footage at every event"},
                      ].map((item,i)=>(
                        <div key={i} style={{padding:"6px 0",borderBottom:i<4?`1px solid rgba(255,255,255,.05)`:"none"}}>
                          <div style={{fontSize:11,fontWeight:800,color:"#fff"}}>{item.name}</div>
                          <div style={{fontSize:11,color:MID,lineHeight:1.5}}>{item.desc}</div>
                        </div>
                      ))}

                      <div style={{marginTop:10,padding:"8px 12px",background:"rgba(245,197,24,.08)",borderRadius:4,fontSize:11,color:MID,lineHeight:1.6}}>
                        💡 <strong style={{color:"#fff"}}>Pro tip:</strong> Before any camp email the coach and let them know your son will be there. This gets his name on a watch list before he even walks in the door.
                      </div>
                    </div>

                  </div>
                ) : (
                  <div style={{marginTop:14,background:"rgba(255,255,255,.03)",border:`1px solid ${BORDER}`,borderRadius:8,padding:"14px",opacity:.55}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <span style={{fontSize:16}}>👩🏾</span>
                      <div style={{fontSize:11,fontWeight:800,color:LG,textTransform:"uppercase",letterSpacing:".08em"}}>Parent's Corner</div>
                      <span style={{marginLeft:"auto",fontSize:12,color:GRAY}}>🔒</span>
                    </div>
                    {["The Recruiting Timeline","NCAA Eligibility Explained","How to Evaluate a Trainer","How to Support Without Overcoaching","Local Camps & Exposure Events"].map((t,i)=>(
                      <div key={i} style={{fontSize:11,color:GRAY,padding:"4px 0",borderBottom:i<4?`1px solid rgba(255,255,255,.04)`:"none",display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:9}}>🔒</span>{t}
                      </div>
                    ))}
                  </div>
                )}

                {accessLevel < 3 && (
                  <>
                    <div style={{background:"rgba(200,16,46,.05)",border:"1px solid rgba(200,16,46,.18)",borderRadius:6,padding:"10px 14px",margin:"14px 0",textAlign:"center"}}>
                      <div style={{fontSize:11,color:RED,fontWeight:700,marginBottom:3}}>⚡ Starter Kit Customer Price</div>
                      <div style={{fontSize:11,color:MID,lineHeight:1.5}}>Unlock all 7 Blueprint modules plus Parent's Corner. Exclusive upgrade pricing available inside the app.</div>
                    </div>
                    <button style={{width:"100%",background:RED,color:"#fff",border:"none",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:900,letterSpacing:".1em",textTransform:"uppercase",padding:"13px",borderRadius:3}}
                      onClick={()=>window.open("https://stan.store/themdbboys/p/the-cornerback-blueprint-ria2vz79","_blank")}>
                      Upgrade to The Cornerback Blueprint →
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ── BOOK ── */}
        {tab === "book" && (
          <div className="page">
            <div style={{ padding: "20px 16px 16px" }}>
              <div className="sec-ttl" style={{ fontSize: 28 }}>BOOK <em style={{ color: G }}>TRAINING</em></div>
              <div style={{ fontSize: 12, color: MID, marginTop: 4 }}>Train with Stefan — in person or virtual · Kansas City</div>
            </div>
            <div style={{ padding: "0 16px 12px", background: `rgba(245,197,24,.04)`, margin: "0 16px 16px", borderRadius: 6, border: `1px solid rgba(245,197,24,.1)` }}>
              <div style={{ padding: "12px 0 4px", fontSize: 13, color: LG, lineHeight: 1.6, fontStyle: "italic" }}>
                "8 years at this position. 4 in high school at Blue Springs — All-State. 4 in D1. 13 scholarship offers. Stefan didn't just play the position. He survived it, learned it, and now he's teaching it."
              </div>
            </div>
            {SESSIONS.map(s => (
              <div key={s.id} className="bkcard">
                <div className="bkhdr">
                  <div className="bkicon">{s.icon}</div>
                  <div>
                    <div className="bkname">{s.title}</div>
                    <div className={`bkspots${s.hot ? " hot" : ""}`}>{s.hot ? "🔥 " : ""}{s.spots} · {s.duration}</div>
                  </div>
                </div>
                <div className="bkfoot">
                  <div><div className="bkprice">${s.price}</div><div className="bklbl">per session</div></div>
                  <button className="bk-btn" onClick={() => { setBookModal(s); setStripeStep(1); setTimeSlot(null); }}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 30-DAY CHECKLIST ── */}
        {tab === "drills" && (
          <div className="page">
            <div style={{ padding: "20px 16px 10px" }}>
              <div className="sec-ttl" style={{ fontSize: 28 }}>30-DAY <em style={{ color: G }}>GAME PLAN</em></div>
              <div style={{ fontSize: 12, color: MID, marginTop: 4, lineHeight: 1.6 }}>5 days a week · Rest Sunday · Watch a video every session · Dynamic stretch + ladder first · 5 reps per drill</div>
            </div>

            {/* DAILY RULES BOX */}
            <div style={{margin:"0 16px 14px",background:"linear-gradient(135deg,#0f0d00,#111000)",border:`1px solid rgba(245,197,24,.2)`,borderRadius:8,padding:"14px 16px"}}>
              <div style={{fontSize:10,fontWeight:900,color:G,letterSpacing:".14em",textTransform:"uppercase",marginBottom:10}}>📋 Every Session — Do In This Order</div>
              {[
                ["🔥","1. Dynamic Stretch","Google 'dynamic warm up football' — do this FIRST every session before anything else"],
                ["🪜","2. Footwork Ladder","YouTube 'footwork ladder drills DB football' — 5 minutes every session before drills"],
                ["📺","3. Watch Today's Video","Review at least one Stefan video before drilling — every single session"],
                ["⚽","4. Run Your Drills","5 reps per drill · Film yourself · Check the box when done"],
                ["😴","5. Rest Sunday","No drills Sunday. Ever. Let your body adapt and rebuild."],
              ].map(([icon,title,desc],i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<4?`1px solid rgba(255,255,255,.05)`:"none"}}>
                  <span style={{fontSize:14,flexShrink:0}}>{icon}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{title}</div>
                    <div style={{fontSize:11,color:MID,lineHeight:1.4}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* PROGRESS BAR */}
            <div className="drpwrap">
              <div className="drphdr">
                <div className="drplbl">Overall Progress</div>
                <div className="drpcnt">{doneCount}/{totalDrills} Days</div>
              </div>
              <div className="drpbar"><div className="drpfill" style={{ width: `${Math.round((doneCount / totalDrills) * 100)}%` }} /></div>
            </div>

            {/* WEEKS */}
            {Object.entries(DRILLS).map(([week, days]) => (
              <div key={week} className="drcat">
                <div className="drcattl">{week}</div>
                {days.map(d => (
                  <div key={d.id} style={{
                    background: completed.has(d.id) ? "rgba(245,197,24,.06)" : CARD,
                    border: `1px solid ${completed.has(d.id) ? "rgba(245,197,24,.25)" : BORDER}`,
                    borderRadius: 8, marginBottom: 8, overflow: "hidden"
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", cursor: "pointer" }}
                      onClick={() => toggleDrill(d.id)}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2,
                        border: `1.5px solid ${completed.has(d.id) ? G : BORDER}`,
                        background: completed.has(d.id) ? G : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        {completed.has(d.id) && <span style={{ fontSize: 11, color: "#000", fontWeight: 900 }}>✓</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 13, fontWeight: 700, lineHeight: 1.4, marginBottom: 4,
                          color: completed.has(d.id) ? "rgba(255,255,255,.45)" : "#fff",
                          textDecoration: completed.has(d.id) ? "line-through" : "none"
                        }}>{d.name}</div>
                        <span style={{
                          fontSize: 9, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase",
                          padding: "2px 7px", borderRadius: 2,
                          background: d.tag.includes("VIDEO") || d.tag.includes("REWATCH")
                            ? G : d.tag === "Rest"
                            ? "rgba(255,255,255,.06)" : "rgba(100,150,255,.1)",
                          color: d.tag.includes("VIDEO") || d.tag.includes("REWATCH")
                            ? "#000" : d.tag === "Rest"
                            ? MID : "#88aaff"
                        }}>{d.tag}</span>
                      </div>
                    </div>
                    {/* VIDEO WATCH BUTTON */}
                    {d.vid && (
                      <div style={{ padding: "0 14px 12px" }}>
                        <button
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${d.vid}`, '_blank')}
                          style={{
                            background: G, color: "#000", border: "none", cursor: "pointer",
                            fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12,
                            fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase",
                            padding: "8px 14px", borderRadius: 3, display: "flex",
                            alignItems: "center", gap: 6
                          }}>
                          ▶ Watch Stefan's Video
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* COMPLETION MESSAGE */}
            {doneCount === totalDrills && (
              <div style={{ textAlign: "center", padding: "24px 16px" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: G }}>30 DAYS. DONE. 🏆</div>
                <div style={{ fontSize: 13, color: MID, marginTop: 6, lineHeight: 1.6 }}>
                  Now watch Day 1 film next to Day 30 film. That difference is your proof. Send it to Stefan. Send it to a coach.
                </div>
              </div>
            )}
          </div>
        )}

        {/* BOTTOM NAV */}
        <div className="bnav">
          {[
            { id: "home", icon: "🏠", label: "Home" },
            { id: "videos", icon: "📚", label: "Courses", badge: "3" },
            { id: "book", icon: "📅", label: "Book" },
            { id: "drills", icon: "✅", label: "Checklist" },
          ].map(n => (
            <div key={n.id} className={`ni${tab === n.id ? " act" : ""}`} onClick={() => { setTab(n.id); setOpenCourse(null); }}>
              {n.badge && <div className="nbadge">{n.badge}</div>}
              <div className="nico">{n.icon}</div>
              <div className="nlbl">{n.label}</div>
            </div>
          ))}
          <div className="ni" onClick={handleLogout} style={{opacity:.7}}>
            <div className="nico">🚪</div>
            <div className="nlbl">Logout</div>
          </div>
        </div>

        {/* BOOKING / STRIPE MODAL */}
        {bookModal && (
          <div className="mo" onClick={() => setBookModal(null)}>
            <div className="mbox" onClick={e => e.stopPropagation()}>
              <div className="mhnd" />
              <button className="mclose" onClick={() => setBookModal(null)}>✕</button>
              {stripeStep === 1 && !bookModal.course && (
                <>
                  <div className="mttl">{bookModal.title}</div>
                  <div className="msub">{bookModal.duration} · ${bookModal.price} per session<br />Select a time to continue</div>
                  <div className="time-slots">
                    {["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "3:00 PM", "4:30 PM"].map(t => (
                      <div key={t} className={`tslot${timeSlot === t ? " sel" : ""}`} onClick={() => setTimeSlot(t)}>{t}</div>
                    ))}
                  </div>
                  <button className="confirm-btn" disabled={!timeSlot} onClick={() => setStripeStep(2)}>
                    {timeSlot ? "Continue to Payment →" : "Select a time first"}
                  </button>
                </>
              )}
              {(stripeStep === 2 || bookModal.course) && (
                <>
                  <div className="mttl">{bookModal.course ? "Cornerback Blueprint" : bookModal.title}</div>
                  <div className="msub">
                    {bookModal.course ? "Lifetime access — all videos, recruiting roadmap, Parent's Corner" : `${timeSlot} · ${bookModal.duration}`}
                    <span style={{ color: G, fontWeight: 800, marginLeft: 8 }}>${bookModal.price}</span>
                  </div>
                  <div className="stripe-wrap">
                    <div className="sf">
                      <label className="slbl">Cardholder Name</label>
                      <input className="sinput" placeholder="Your Name" value={payForm.name} onChange={e => setPayForm(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div className="sf">
                      <label className="slbl">Card Number</label>
                      <input className="sinput" placeholder="4242 4242 4242 4242" maxLength={19} value={payForm.card}
                        onChange={e => setPayForm(p => ({ ...p, card: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim() }))} />
                    </div>
                    <div className="stripe-row">
                      <div className="sf">
                        <label className="slbl">Expiry</label>
                        <input className="sinput" placeholder="MM / YY" maxLength={7} value={payForm.exp} onChange={e => setPayForm(p => ({ ...p, exp: e.target.value }))} />
                      </div>
                      <div className="sf">
                        <label className="slbl">CVV</label>
                        <input className="sinput" placeholder="123" maxLength={4} value={payForm.cvv} onChange={e => setPayForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "") }))} />
                      </div>
                    </div>
                  </div>
                  <div className="stripe-sec">
                    <div className="stripe-logo">stripe</div>
                    <span>🔒 Secured by Stripe · SSL Encrypted</span>
                  </div>
                  <button className="confirm-btn" disabled={!payForm.card || !payForm.exp || !payForm.cvv || !payForm.name} onClick={handlePay}>
                    Pay ${bookModal.price} →
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* YT PLAYER */}
        {ytModal && (
          <div className="yt-mo" onClick={() => setYtModal(null)}>
            <div className="yt-box" onClick={e => e.stopPropagation()}>
              <div className="yt-frame">
                <iframe
                  key={ytModal.id}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${ytModal.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={ytModal.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
              <div className="yt-info">
                <div className="yt-ttl">{ytModal.title}</div>
                <div className="yt-desc">{ytModal.desc}</div>
                <button className="yt-close" onClick={() => setYtModal(null)}>✕ Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
