import type { Metadata } from "next";
import { brand } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

export const metadata: Metadata = {
  title: "Mentions légales · Com'Jam",
  description:
    "Mentions légales du site Com'Jam. Éditeur, hébergement, propriété intellectuelle, données personnelles, cookies.",
  robots: { index: false, follow: true },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-[24px] sm:text-[28px] font-normal text-blue mb-4 leading-tight">
        {title}
      </h2>
      <div className="text-[15px] font-light leading-[1.85] text-blue-mid space-y-3">
        {children}
      </div>
    </section>
  );
}

function Pair({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <dt className="text-[11px] font-medium tracking-[2px] uppercase text-blue-light sm:w-44 sm:shrink-0 pt-1">
        {label}
      </dt>
      <dd className="text-[15px] font-light text-blue-mid">{value}</dd>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <section
      className="bg-paper pt-[160px]"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingBottom: "var(--gap)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <Label>Informations légales</Label>
          <h1
            className="display mt-5 mb-4"
            style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
          >
            Mentions <em>légales.</em>
          </h1>
          <p className="text-[14px] font-light text-text-light italic mb-14">
            Dernière mise à jour&nbsp;: mai 2026
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <Section title="1. Éditeur du site">
            <dl className="grid gap-3">
              <Pair label="Dénomination" value={`${brand.name} ${brand.suffix}`} />
              <Pair label="Forme juridique" value="Entreprise individuelle" />
              <Pair label="Adresse" value={`${brand.city}, France`} />
              <Pair
                label="Email"
                value={
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-blue underline underline-offset-2 hover:no-underline"
                  >
                    {brand.email}
                  </a>
                }
              />
              <Pair
                label="Directrice de la publication"
                value="Jamila, fondatrice de Com'Jam"
              />
            </dl>
            <p className="pt-2 text-[13px] text-text-light italic">
              Le numéro SIRET et les coordonnées professionnelles complètes
              sont communiqués sur simple demande à l&apos;adresse ci-dessus.
            </p>
          </Section>
        </Reveal>

        <Reveal delay={0.1}>
          <Section title="2. Hébergement">
            <dl className="grid gap-3">
              <Pair label="Hébergeur" value="Vercel Inc." />
              <Pair
                label="Adresse"
                value="440 N Barranca Ave #4133, Covina, CA 91723, États-Unis"
              />
              <Pair
                label="Site"
                value={
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue underline underline-offset-2 hover:no-underline"
                  >
                    vercel.com
                  </a>
                }
              />
            </dl>
          </Section>
        </Reveal>

        <Reveal delay={0.15}>
          <Section title="3. Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu du site (textes, photographies,
              vidéos, illustrations, identité visuelle, logo, charte graphique)
              est la propriété exclusive de {brand.name} {brand.suffix}, sauf
              mentions contraires.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou
              adaptation, totale ou partielle, des éléments du site, quel que
              soit le moyen ou le procédé utilisé, est interdite sans
              l&apos;autorisation écrite préalable de l&apos;éditeur.
            </p>
          </Section>
        </Reveal>

        <Reveal delay={0.2}>
          <Section title="4. Données personnelles">
            <p>
              Les informations recueillies via le formulaire de contact (nom,
              prénom, email, message) sont nécessaires pour répondre à votre
              demande. Elles sont destinées uniquement à {brand.name}{" "}
              {brand.suffix} et ne sont jamais cédées ni vendues à des tiers.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement, de portabilité et
              d&apos;opposition concernant vos données. Pour exercer ces
              droits, contactez-nous à{" "}
              <a
                href={`mailto:${brand.email}`}
                className="text-blue underline underline-offset-2 hover:no-underline"
              >
                {brand.email}
              </a>
              .
            </p>
            <p>
              Les soumissions du formulaire de contact sont transmises via
              Resend (resend.com), partenaire technique chargé de
              l&apos;acheminement des emails.
            </p>
          </Section>
        </Reveal>

        <Reveal delay={0.25}>
          <Section title="5. Cookies">
            <p>
              Le site n&apos;utilise pas de cookies de suivi publicitaire ni
              d&apos;analyse comportementale. Seuls des cookies strictement
              nécessaires au bon fonctionnement du site peuvent être déposés
              (préférences techniques).
            </p>
          </Section>
        </Reveal>

        <Reveal delay={0.3}>
          <Section title="6. Limitation de responsabilité">
            <p>
              {brand.name} {brand.suffix} s&apos;efforce d&apos;assurer
              l&apos;exactitude et la mise à jour des informations publiées
              sur ce site. Toutefois, l&apos;éditeur ne saurait être tenu pour
              responsable des erreurs, d&apos;une absence de disponibilité ou
              de la présence de virus sur le site.
            </p>
            <p>
              Les liens externes proposés sur le site renvoient vers des
              ressources gérées par des tiers et dont le contenu ne saurait
              engager la responsabilité de Com&apos;Jam Agency.
            </p>
          </Section>
        </Reveal>

        <Reveal delay={0.35}>
          <Section title="7. Droit applicable">
            <p>
              Les présentes mentions légales sont soumises au droit français.
              Tout litige relatif à l&apos;utilisation du site relève de la
              compétence des tribunaux français.
            </p>
          </Section>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-14 pt-8 border-t border-beige-mid">
            <p className="text-[13px] font-light text-text-light italic">
              Pour toute question relative à ces mentions ou à vos données,
              écrivez-nous à{" "}
              <a
                href={`mailto:${brand.email}`}
                className="text-blue underline underline-offset-2 hover:no-underline not-italic"
              >
                {brand.email}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
