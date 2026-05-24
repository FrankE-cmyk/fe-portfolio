"use client";
import { useState, useEffect, type CSSProperties } from "react";

const projectImages = {
  npsa: "/images/trustedresearch.png",
  telecare: "/images/telecare.gif",
  taxfacts: "/images/taxfacts.gif",
  badapple: "/images/badapple.jpg",
  hidden: "/images/hiddenthreads.gif",
  khog: "/images/khoghewad.gif",
};

type ImageKey = keyof typeof projectImages;

type ImageGallery = {
  grid: string[];
  featured?: string;
  gridEnd?: string;
};

type ProjectDetail = {
  client: string;
  paragraphs: string[];
  tagline?: string;
  taglineAfterVideo?: boolean;
  channels?: string;
  images?: string[];
  imageGallery?: ImageGallery;
  youtubeId?: string;
  youtubeAutoplay?: boolean;
  youtubeMute?: boolean;
  youtubeIds?: string[];
  paragraphsAfter?: string[];
};

type Project = {
  id: number;
  title: string;
  imageKey: ImageKey;
  client: string;
  logoText: string;
  bg: string;
  accent: string;
  textColor: string;
  hasVideo: boolean;
  detail?: ProjectDetail;
};

type GridPlacement = {
  column: string;
  row: string;
};

type PageShellProps = {
  onBack: () => void;
  isMobile: boolean;
};

type ProjectTileProps = {
  project: Project;
  placement: GridPlacement | null;
  onClick: (project: Project) => void;
  isMobile: boolean;
};

type ProjectPageProps = PageShellProps & {
  project: Project;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Trusted Research",
    imageKey: "npsa",
    client: "NPSA",
    logoText: "NPSA",
    bg: "#111418",
    accent: "#8a9bb5",
    textColor: "#e8ecf2",
    hasVideo: false,
    detail: {
      client: "National Protective Security Authority",
      paragraphs: [
        "UK academics are being targeted by overseas institutions offering collaboration, when the real goal is to steal their work. NPSA needed a campaign to change behaviour without focusing too much on risk and threat, which had previously been ineffective.",
        "I knew that academics take pride in their work and their reputation. So, instead of highlighting risk as a creative concept, I reminded them of what's worth keeping safe.",
      ],
      tagline: "Your research is your pride and joy. Protect it.",
      channels:
        "Social and digital: LinkedIn, ResearchGate, Google search, email and web, plus university partner materials.",
      images: [
        "/images/npsa-1.jpg",
        "/images/npsa-2.gif",
        "/images/npsa-3.jpg",
      ],
    },
  },
  {
    id: 2,
    title: "National Telecare Campaign",
    imageKey: "telecare",
    client: "BT / VMO2 / DSIT / DHSC",
    logoText: "Telecare",
    bg: "#0d1a18",
    accent: "#6b9e8a",
    textColor: "#e0f0ec",
    hasVideo: true,
    detail: {
      client: "BT / Virgin Media O2 / DSIT / DHSC",
      paragraphs: [
        "The UK is switching all analogue landlines to digital – a change that puts roughly 2 million telecare users at serious risk. Personal alarms and fall detectors rely on landline connections. If not migrated correctly, they stop working. For elderly and vulnerable people living alone, that's not a technical inconvenience. It's a safeguarding crisis.",
        "The campaign needed to reach one of the hardest audiences in the UK – older, largely offline, and likely to assume their provider would handle everything automatically – without causing panic.",
        "My creative concept centred on a relatable 'hero' character who discovers the issue and shares it with her neighbours, creating a community ripple effect. The voiceover used plain language and a single, unambiguous call to action. The tone was warm, calm, and trustworthy throughout.",
        "The TV ad aired across ITV, Channel 4, Channel 5 and VOD. The wider campaign extended across national and regional press, out of home, digital and social, radio, and partner toolkits for charities and local authorities – all delivered in-house, from concept to broadcast-ready film in under five weeks.",
      ],
      youtubeId: "7Qklcdq7PQo",
      youtubeAutoplay: true,
      youtubeMute: true,
      paragraphsAfter: ["The results exceeded every benchmark:"],
      tagline:
        "Awareness of the switchover's impact on telecare devices rose +28% among landline dependents – awareness of the required action rose +18% among the same group – 77% of campaign recognisers had taken or planned action within 12 months, vs 65% of non-recognisers",
      taglineAfterVideo: true,
    },
  },
  {
    id: 3,
    title: "Tax Facts",
    imageKey: "taxfacts",
    client: "HMRC",
    logoText: "HMRC",
    bg: "#191614",
    accent: "#c4966a",
    textColor: "#f5ede0",
    hasVideo: true,
    detail: {
      client: "HMRC",
      paragraphs: [
        "HMRC needed a series of animated videos to help children understand how tax works – written for classroom use, with lesson plans developed by a specialist education agency.",
        "The scripts needed significant work to flow naturally and land clearly for young audiences. As well as redrafting them across multiple rounds, I developed consistent characters to carry through the series, attended the casting and photoshoot to ensure everything aligned to the original vision, and was present at the voiceover recording session to help guide tone.",
      ],
      youtubeIds: [
        "cFNy829Xbfs",
        "fbZlWBDplik",
        "9QOwR9wxR9M",
        "BUPsosKVT8k",
      ],
    },
  },
  {
    id: 4,
    title: "Khog Hewad",
    imageKey: "khog",
    client: "FCDO",
    logoText: "FCDO",
    bg: "#1a1510",
    accent: "#c9a96a",
    textColor: "#f5ede0",
    hasVideo: true,
    detail: {
      client: "Foreign Commonwealth and Development Office",
      paragraphs: [
        "FCDO needed a social media campaign to prevent young men in Afghanistan from joining ISKP – an ISIS splinter group – by countering the misinformation their recruiters use. The constraints were significant: nothing that endorsed the Taliban, no western framing, no language that could put people in danger.",
        "The solution was three messaging themes – peace and community; homeland, religion and culture; youth and prosperity – each designed to make audiences question what they were being told rather than directly confront those telling it.",
        "The campaign included video scripts using newsreel footage, static and animated ads, and post copy – all translated into Pashto and Uzbek. Within two weeks it had reached half a million people and outperformed every benchmark set.",
      ],
      tagline:
        "Across Q2 2023: 4m impressions – 429k video views – 91k hours viewed – 16k website visits – engagement rate of 7%, against a FCDO baseline of 3.5%",
      imageGallery: {
        grid: [
          "/images/khog-1.png",
          "/images/khog-2.png",
          "/images/khog-3.png",
          "/images/khog-4.png",
        ],
        featured: "/images/khog-gif.gif",
      },
    },
  },
  {
    id: 5,
    title: "Bad Apple",
    imageKey: "badapple",
    client: "Cabinet Office",
    logoText: "CO",
    bg: "#141410",
    accent: "#9e8a6b",
    textColor: "#f0ece0",
    hasVideo: false,
    detail: {
      client: "Cabinet Office, concept pitch",
      paragraphs: [
        "The Cabinet Office's Public Sector Fraud Authority needed a campaign to make civil servants more aware of workplace fraud, and more likely to report it. The challenge was tone: fraud is serious, but the audience is largely honest, so accusatory messaging risks alienating the very people you need on side.",
        "My concept played on a familiar idiom to reframe the issue. Rather than pointing fingers, it acknowledged that fraud is committed by a minority, and it invited the majority to protect what they'd all worked to build.",
        "The concept was designed for posters, digital screens and intranet banners across government offices. The client considered it too risky. I disagree.",
      ],
      tagline: "Don't let one bad apple spoil the bunch.",
      imageGallery: {
        grid: [
          "/images/apple-1.jpg",
          "/images/apple-2.jpg",
          "/images/apple-3.jpg",
          "/images/apple-4.jpg",
        ],
        gridEnd: "/images/apple-5.jpg",
      },
    },
  },
  {
    id: 6,
    title: "Hidden Threads",
    imageKey: "hidden",
    client: "UK Space Command",
    logoText: "UKSC",
    bg: "#0e0e18",
    accent: "#8a7ab5",
    textColor: "#e8e4f5",
    hasVideo: true,
    detail: {
      client: "UK Space Command",
      paragraphs: [
        "Space technology keeps our everyday lives functioning far beyond what most people realise, from mobile phones and ATMs to agriculture, petrol stations and military capability. UK Space Command needed to tell that story to the public, the armed forces, and industry.",
      ],
      tagline:
        "The hidden thread: space technology is a force that stays invisible, weaving through our daily lives, keeping everything in time. Fragile but essential.",
      youtubeId: "jVP1cNJQydk",
    },
  },
];

// 6 tiles: 2 rows of 3, top row taller than bottom
const gridPlacements: GridPlacement[] = [
  { column: "1 / span 1", row: "1 / span 1" },
  { column: "2 / span 1", row: "1 / span 1" },
  { column: "3 / span 1", row: "1 / span 1" },
  { column: "1 / span 1", row: "2 / span 1" },
  { column: "2 / span 1", row: "2 / span 1" },
  { column: "3 / span 1", row: "2 / span 1" },
];

function ProjectTile({ project, placement, onClick, isMobile }: ProjectTileProps) {
  const [hovered, setHovered] = useState(false);

  const tileStyle: CSSProperties = isMobile
    ? {
        width: "100%",
        aspectRatio: "1 / 1",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: project.bg,
        flexShrink: 0,
      }
    : {
        gridColumn: placement!.column,
        gridRow: placement!.row,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: project.bg,
        aspectRatio: "1 / 1",
        width: "100%",
      };

  return (
    <div
      style={tileStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Background image — fades in on hover */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: project.imageKey ? `url(${projectImages[project.imageKey]})` : `linear-gradient(135deg, ${project.bg} 0%, ${project.accent}22 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1,
        opacity: 1,
        transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }} />

      {/* Dark scrim over image on hover for text legibility */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.97)",
        zIndex: 2,
        opacity: hovered ? 0.6 : 0,
        transition: "opacity 0.5s ease",
      }} />

      {/* Resting state — logo placeholder centred */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.35s ease",
        pointerEvents: "none",
      }}>
        {/* Logo placeholder — styled acronym block */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}>
          {/* Accent bar above */}
          <div style={{
            width: "24px",
            height: "1px",
            background: project.accent,
            opacity: 0.6,
          }} />
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "28px",
            fontWeight: 400,
            color: project.textColor,
            letterSpacing: "0.08em",
            opacity: 0.85,
          }}>
            {project.logoText}
          </span>
          {/* Accent bar below */}
          <div style={{
            width: "24px",
            height: "1px",
            background: project.accent,
            opacity: 0.6,
          }} />
        </div>
      </div>

      {/* Title and client — centred on hover */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxSizing: "border-box",
        textAlign: "center",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s ease",
        pointerEvents: "none",
      }}>
        <p style={{
          fontFamily: "sans-serif",
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#ffffff",
          marginBottom: "5px",
        }}>
          {project.client}
        </p>
        <h2 style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: 500,
          color: "#ffffff",
          lineHeight: 1.2,
          margin: 0,
          maxWidth: "100%",
          wordBreak: "break-word",
        }}>
          {project.title}
        </h2>
      </div>

      {/* Subtle grain */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        opacity: 0.5,
        zIndex: 5,
        pointerEvents: "none",
      }} />
    </div>
  );
}

function AboutPage({ onBack, isMobile }: PageShellProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e0e0c",
        padding: isMobile ? "40px 24px" : "60px 80px",
        fontFamily: "Inter, sans-serif",
        animation: "fadeSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        boxSizing: "border-box",
        color: "#f0ede6",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#c9b99a",
          fontFamily: "sans-serif",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "60px",
          padding: 0,
          opacity: 0.8,
        }}
      >
        ← Back
      </button>

      <div style={{ maxWidth: "760px" }}>
        <h1
          style={{
            color: "#f0ede6",
            fontSize: isMobile ? "36px" : "56px",
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: "48px",
            wordBreak: "break-word",
          }}
        >
          Creative Copywriter for the Public Sector
        </h1>

        <p
          style={{
            color: "#f0ede6",
            opacity: 0.65,
            fontSize: "18px",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "640px",
          }}
        >
          I&apos;m Francis, a copywriter and communicator with deep public sector
          experience, both agency and client-side. My work is about telling the
          general public what they need to know, to keep them safe and to raise
          their confidence in government.
        </p>
      </div>
    </div>
  );
}

function getYoutubeEmbedSrc(
  id: string,
  { autoplay = false, mute = false }: { autoplay?: boolean; mute?: boolean } = {}
) {
  const params = new URLSearchParams();
  if (autoplay) params.set("autoplay", "1");
  if (mute) params.set("mute", "1");
  const query = params.toString();
  return `https://www.youtube.com/embed/${id}${query ? `?${query}` : ""}`;
}

function ProjectPage({ project, onBack, isMobile }: ProjectPageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: project.bg,
        padding: isMobile ? "40px 24px" : "60px 80px",
        fontFamily: "Inter, sans-serif",
        animation: "fadeSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: project.accent,
          fontFamily: "sans-serif",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "60px",
          padding: 0,
          opacity: 0.8,
        }}
      >
        ← Back
      </button>

      <div style={{ maxWidth: "760px" }}>
        {project.detail ? (
          <>
            <p
              style={{
                color: project.accent,
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "20px",
                fontFamily: "sans-serif",
              }}
            >
              {project.detail.client}
            </p>
            <h1
              style={{
                color: project.textColor,
                fontSize: isMobile ? "42px" : "64px",
                fontWeight: 300,
                lineHeight: 1.05,
                marginBottom: "40px",
                wordBreak: "break-word",
              }}
            >
              {project.title}
            </h1>

            <div
              style={{
                width: "48px",
                height: "1px",
                background: project.accent,
                marginBottom: "36px",
                opacity: 0.6,
              }}
            />

            {project.detail.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                style={{
                  color: project.textColor,
                  opacity: 0.65,
                  fontSize: "18px",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                }}
              >
                {paragraph}
              </p>
            ))}

            {project.detail.tagline && !project.detail.taglineAfterVideo && (
              <p
                style={{
                  color: project.textColor,
                  fontSize: isMobile ? "26px" : "32px",
                  fontWeight: 500,
                  lineHeight: 1.35,
                  marginBottom: "32px",
                  marginTop: "8px",
                }}
              >
                {project.detail.tagline}
              </p>
            )}

            {project.detail.channels && (
              <p
                style={{
                  color: project.textColor,
                  opacity: 0.5,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  fontFamily: "sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                {project.detail.channels}
              </p>
            )}

            {project.detail.youtubeId && (
              <div
                style={{
                  marginTop: "48px",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  src={getYoutubeEmbedSrc(project.detail.youtubeId, {
                    autoplay: project.detail.youtubeAutoplay,
                    mute: project.detail.youtubeMute,
                  })}
                  title={`${project.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                    display: "block",
                  }}
                />
              </div>
            )}

            {(project.detail.youtubeIds?.length ?? 0) > 0 && (
              <div
                style={{
                  marginTop: "48px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {(project.detail.youtubeIds ?? []).map((id, index) => (
                  <div
                    key={id}
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${id}`}
                      title={`${project.title} — video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                        display: "block",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {project.detail.paragraphsAfter?.map((paragraph) => (
              <p
                key={paragraph}
                style={{
                  color: project.textColor,
                  opacity: 0.65,
                  fontSize: "18px",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                  marginTop: "48px",
                }}
              >
                {paragraph}
              </p>
            ))}

            {project.detail.tagline && project.detail.taglineAfterVideo && (
              <p
                style={{
                  color: project.textColor,
                  fontSize: isMobile ? "26px" : "32px",
                  fontWeight: 500,
                  lineHeight: 1.35,
                  marginBottom: "32px",
                  marginTop: project.detail.paragraphsAfter?.length ? "8px" : "48px",
                }}
              >
                {project.detail.tagline}
              </p>
            )}

            {project.detail.imageGallery && (
              <div
                style={{
                  marginTop: "48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {project.detail.imageGallery.gridEnd ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      alignItems: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {project.detail.imageGallery.grid
                        .filter((_, i) => i % 2 === 0)
                        .map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt={`${project.title} — image`}
                            style={{
                              width: "100%",
                              height: "auto",
                              display: "block",
                              borderRadius: "8px",
                            }}
                          />
                        ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        height: "100%",
                        minHeight: 0,
                      }}
                    >
                      {project.detail.imageGallery.grid
                        .filter((_, i) => i % 2 === 1)
                        .map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt={`${project.title} — image`}
                            style={{
                              width: "100%",
                              height: "auto",
                              display: "block",
                              borderRadius: "8px",
                            }}
                          />
                        ))}
                      <div
                        style={{
                          marginTop: "auto",
                          overflow: "hidden",
                          borderRadius: "8px",
                          lineHeight: 0,
                        }}
                      >
                        <img
                          src={project.detail.imageGallery.gridEnd}
                          alt={`${project.title} — image`}
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            marginBottom: "-24px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    {project.detail.imageGallery.grid.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${project.title} — image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          borderRadius: "8px",
                        }}
                      />
                    ))}
                  </div>
                )}
                {project.detail.imageGallery.featured && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={project.detail.imageGallery.featured}
                      alt={`${project.title} — animation`}
                      style={{
                        width: "100%",
                        maxWidth: "400px",
                        height: "auto",
                        display: "block",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {(project.detail.images?.length ?? 0) > 0 && (
              <div
                style={{
                  marginTop: "48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {(project.detail.images ?? []).map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title} — image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <p
              style={{
                color: project.accent,
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "20px",
                fontFamily: "sans-serif",
              }}
            >
              {project.client}
            </p>
            <h1
              style={{
                color: project.textColor,
                fontSize: isMobile ? "42px" : "64px",
                fontWeight: 300,
                lineHeight: 1.05,
                marginBottom: "40px",
                wordBreak: "break-word",
              }}
            >
              {project.title}
            </h1>

            <div
              style={{
                width: "48px",
                height: "1px",
                background: project.accent,
                marginBottom: "36px",
                opacity: 0.6,
              }}
            />

            <p
              style={{
                color: project.textColor,
                opacity: 0.5,
                fontSize: "18px",
                lineHeight: 1.8,
              }}
            >
              Project detail and copy samples would live here. A brief paragraph
              explaining the brief, the challenge, and the approach — followed
              by the actual work.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 680);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goHome = () => {
    setActiveProject(null);
    setShowAbout(false);
  };

  if (showAbout) {
    return <AboutPage onBack={goHome} isMobile={isMobile} />;
  }

  if (activeProject) {
    return (
      <ProjectPage
        project={activeProject}
        onBack={() => setActiveProject(null)}
        isMobile={isMobile}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e0c", color: "#f0ede6" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0e0e0c; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .fade-up-delay { animation: fadeUp 0.9s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .fade-up-delay-2 { animation: fadeUp 0.9s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
      `}</style>

      {/* Header */}
      <header
        style={{
          padding: isMobile ? "24px 20px" : "28px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        className="fade-up"
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "18px",
            fontWeight: 300,
            color: "#f0ede6",
            letterSpacing: "0.04em",
          }}
        >
          FE
        </span>
        <nav style={{ display: "flex", gap: isMobile ? "20px" : "32px" }}>
          {[
            { label: "Work", onClick: goHome, active: !showAbout },
            {
              label: "About",
              onClick: () => {
                setActiveProject(null);
                setShowAbout(true);
              },
              active: showAbout,
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              style={{
                background: "none",
                border: "none",
                fontFamily: "sans-serif",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#f0ede6",
                opacity: item.active ? 0.85 : 0.35,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Grid — no hero, goes straight to work */}
      <section style={{ padding: isMobile ? "0" : "0" }}>
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "12px" }}>
            {projects.map((project) => (
              <ProjectTile
                key={project.id}
                project={project}
                placement={null}
                onClick={setActiveProject}
                isMobile={true}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: "16px",
              padding: "24px 48px",
            }}
          >
            {projects.map((project, i) => (
              <ProjectTile
                key={project.id}
                project={project}
                placement={gridPlacements[i]}
                onClick={setActiveProject}
                isMobile={false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}