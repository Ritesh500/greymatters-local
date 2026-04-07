import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// ─── Generic field components ────────────────────────────────────────────────

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
        {label}
        {hint && <span className="ml-1 text-slate-400 font-normal normal-case tracking-normal">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, className = '' }) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${className}`}
    />
  );
}

function NumberInput({ value, onChange, placeholder }) {
  return (
    <input
      type="number"
      value={value ?? ''}
      onChange={e => onChange(Number(e.target.value))}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y"
    />
  );
}

// Edits an array of simple strings — one per line
function StringArrayInput({ value, onChange, placeholder }) {
  const text = Array.isArray(value) ? value.join('\n') : '';
  return (
    <textarea
      value={text}
      onChange={e => onChange(e.target.value.split('\n').filter(s => s.trim() !== '' || e.target.value.endsWith('\n')))}
      placeholder={placeholder || 'One item per line'}
      rows={4}
      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y font-mono"
    />
  );
}

// Edits a complex value as raw JSON
function JsonInput({ value, onChange }) {
  const [raw, setRaw] = useState(JSON.stringify(value, null, 2));
  const [jsonError, setJsonError] = useState('');

  useEffect(() => {
    setRaw(JSON.stringify(value, null, 2));
  }, [value]);

  const handleBlur = () => {
    try {
      onChange(JSON.parse(raw));
      setJsonError('');
    } catch {
      setJsonError('Invalid JSON — changes not saved');
    }
  };

  return (
    <div>
      <textarea
        value={raw}
        onChange={e => setRaw(e.target.value)}
        onBlur={handleBlur}
        rows={10}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y font-mono"
      />
      {jsonError && <p className="text-red-500 text-xs mt-1">{jsonError}</p>}
    </div>
  );
}

// Generic array-of-objects editor
function ArrayEditor({ items = [], onChange, fields, newItem }) {
  const [openIdx, setOpenIdx] = useState(null);

  const update = (idx, key, val) => {
    const next = items.map((item, i) => i === idx ? { ...item, [key]: val } : item);
    onChange(next);
  };

  const remove = (idx) => {
    onChange(items.filter((_, i) => i !== idx));
    if (openIdx === idx) setOpenIdx(null);
  };

  const add = () => {
    const item = typeof newItem === 'function' ? newItem() : (newItem || {});
    const next = [...items, item];
    onChange(next);
    setOpenIdx(next.length - 1);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const next = [...items];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
    setOpenIdx(idx - 1);
  };

  const moveDown = (idx) => {
    if (idx === items.length - 1) return;
    const next = [...items];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
    setOpenIdx(idx + 1);
  };

  const getTitle = (item) => {
    const titleField = fields.find(f => f.isTitle);
    return titleField ? (item[titleField.key] || `Item ${items.indexOf(item) + 1}`) : `Item ${items.indexOf(item) + 1}`;
  };

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
          <div
            className="flex items-center justify-between px-4 py-3 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <span className="text-sm font-medium text-slate-700 truncate max-w-xs">{getTitle(item)}</span>
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              <button
                onClick={e => { e.stopPropagation(); moveUp(idx); }}
                disabled={idx === 0}
                className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                title="Move up"
              >↑</button>
              <button
                onClick={e => { e.stopPropagation(); moveDown(idx); }}
                disabled={idx === items.length - 1}
                className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                title="Move down"
              >↓</button>
              <button
                onClick={e => { e.stopPropagation(); remove(idx); }}
                className="p-1 text-red-400 hover:text-red-600"
                title="Delete"
              >✕</button>
              <span className="text-slate-400 ml-1">{openIdx === idx ? '▲' : '▼'}</span>
            </div>
          </div>
          {openIdx === idx && (
            <div className="p-4 space-y-4 bg-white">
              {fields.map(field => (
                <Field key={field.key} label={field.label} hint={field.hint}>
                  {field.type === 'textarea' ? (
                    <TextArea value={item[field.key]} onChange={v => update(idx, field.key, v)} placeholder={field.placeholder} rows={field.rows} />
                  ) : field.type === 'number' ? (
                    <NumberInput value={item[field.key]} onChange={v => update(idx, field.key, v)} placeholder={field.placeholder} />
                  ) : field.type === 'stringArray' ? (
                    <StringArrayInput value={item[field.key]} onChange={v => update(idx, field.key, v)} placeholder={field.placeholder} />
                  ) : field.type === 'json' ? (
                    <JsonInput value={item[field.key]} onChange={v => update(idx, field.key, v)} />
                  ) : (
                    <TextInput value={item[field.key]} onChange={v => update(idx, field.key, v)} placeholder={field.placeholder} />
                  )}
                </Field>
              ))}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={add}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 text-slate-500 text-sm font-medium rounded-xl hover:border-red-400 hover:text-red-500 transition-colors"
      >
        + Add Item
      </button>
    </div>
  );
}

// ─── Section editors ──────────────────────────────────────────────────────────

function SectionCard({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm">{title}</span>
        <span className="text-slate-400 text-xs">{open ? '▲ Collapse' : '▼ Expand'}</span>
      </button>
      {open && <div className="p-6 bg-white space-y-5">{children}</div>}
    </div>
  );
}

// ─── Page editors ─────────────────────────────────────────────────────────────

function HomeEditor({ content, onChange }) {
  const set = (section, key, val) => onChange({ ...content, [section]: { ...(content[section] || {}), [key]: val } });
  const setSection = (section, val) => onChange({ ...content, [section]: val });

  const hero = content.hero || {};
  const trust = content.trust || {};
  const cp = content.coursesPreview || {};
  const hiw = content.howItWorks || {};
  const ss = content.successStories || {};

  return (
    <>
      <SectionCard title="Hero Section">
        <Field label="Badge Text"><TextInput value={hero.badge} onChange={v => set('hero', 'badge', v)} /></Field>
        <Field label="Heading Line 1"><TextInput value={hero.heading1} onChange={v => set('hero', 'heading1', v)} /></Field>
        <Field label="Heading Line 2 (red accent)"><TextInput value={hero.heading2} onChange={v => set('hero', 'heading2', v)} /></Field>
        <Field label="Description"><TextArea value={hero.description} onChange={v => set('hero', 'description', v)} /></Field>
        <Field label="Primary Button"><TextInput value={hero.primaryBtn} onChange={v => set('hero', 'primaryBtn', v)} /></Field>
        <Field label="Secondary Button"><TextInput value={hero.secondaryBtn} onChange={v => set('hero', 'secondaryBtn', v)} /></Field>
        <Field label="Feature Badges" hint="title of each badge">
          <ArrayEditor
            items={hero.features || []}
            onChange={v => set('hero', 'features', v)}
            fields={[{ key: 'label', label: 'Feature Label', isTitle: true }]}
            newItem={{ label: '' }}
          />
        </Field>
        <Field label="Stats Cards">
          <ArrayEditor
            items={hero.stats || []}
            onChange={v => set('hero', 'stats', v)}
            fields={[
              { key: 'value', label: 'Number', type: 'number', isTitle: true },
              { key: 'suffix', label: 'Suffix (+, %)' },
              { key: 'label', label: 'Label' },
            ]}
            newItem={{ value: 0, suffix: '+', label: '' }}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Trust Section">
        <Field label="Eyebrow"><TextInput value={trust.eyebrow} onChange={v => set('trust', 'eyebrow', v)} /></Field>
        <Field label="Title"><TextInput value={trust.title} onChange={v => set('trust', 'title', v)} /></Field>
        <Field label="Description"><TextArea value={trust.description} onChange={v => set('trust', 'description', v)} /></Field>
        <Field label="Trust Points">
          <ArrayEditor
            items={trust.points || []}
            onChange={v => set('trust', 'points', v)}
            fields={[
              { key: 'title', label: 'Title', isTitle: true },
              { key: 'description', label: 'Description', type: 'textarea' },
            ]}
            newItem={{ title: '', description: '' }}
          />
        </Field>
        <Field label="Milestones (Timeline)">
          <ArrayEditor
            items={trust.milestones || []}
            onChange={v => set('trust', 'milestones', v)}
            fields={[
              { key: 'year', label: 'Year', isTitle: true },
              { key: 'event', label: 'Event' },
            ]}
            newItem={{ year: '', event: '' }}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Courses Preview">
        <Field label="Eyebrow"><TextInput value={cp.eyebrow} onChange={v => set('coursesPreview', 'eyebrow', v)} /></Field>
        <Field label="Title"><TextInput value={cp.title} onChange={v => set('coursesPreview', 'title', v)} /></Field>
        <Field label="Description"><TextArea value={cp.description} onChange={v => set('coursesPreview', 'description', v)} /></Field>
        <Field label="Courses">
          <ArrayEditor
            items={cp.courses || []}
            onChange={v => set('coursesPreview', 'courses', v)}
            fields={[
              { key: 'id', label: 'ID (ielts/pte/spoken_english/immigration)', isTitle: true },
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'features', label: 'Feature Tags', type: 'stringArray', hint: 'one per line' },
              { key: 'students', label: 'Students Count (e.g. 2L+)' },
              { key: 'rating', label: 'Rating', type: 'number' },
              { key: 'duration', label: 'Duration' },
            ]}
            newItem={{ id: '', title: '', description: '', features: [], students: '', rating: 4.9, duration: '' }}
          />
        </Field>
      </SectionCard>

      <SectionCard title="How It Works (Home)">
        <Field label="Eyebrow"><TextInput value={hiw.eyebrow} onChange={v => set('howItWorks', 'eyebrow', v)} /></Field>
        <Field label="Title"><TextInput value={hiw.title} onChange={v => set('howItWorks', 'title', v)} /></Field>
        <Field label="Description"><TextArea value={hiw.description} onChange={v => set('howItWorks', 'description', v)} /></Field>
        <Field label="Steps">
          <ArrayEditor
            items={hiw.steps || []}
            onChange={v => set('howItWorks', 'steps', v)}
            fields={[
              { key: 'step', label: 'Step Number (01, 02...)', isTitle: true },
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ]}
            newItem={{ step: '', title: '', description: '' }}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Success Stories (Home)">
        <Field label="Eyebrow"><TextInput value={ss.eyebrow} onChange={v => set('successStories', 'eyebrow', v)} /></Field>
        <Field label="Title"><TextInput value={ss.title} onChange={v => set('successStories', 'title', v)} /></Field>
        <Field label="Description"><TextArea value={ss.description} onChange={v => set('successStories', 'description', v)} /></Field>
        <Field label="Stories">
          <ArrayEditor
            items={ss.stories || []}
            onChange={v => set('successStories', 'stories', v)}
            fields={[
              { key: 'name', label: 'Student Name', isTitle: true },
              { key: 'score', label: 'Score/Achievement' },
              { key: 'exam', label: 'Exam' },
              { key: 'destination', label: 'Destination Country' },
              { key: 'university', label: 'University' },
              { key: 'image', label: 'Photo URL' },
              { key: 'testimonial', label: 'Testimonial', type: 'textarea', rows: 4 },
            ]}
            newItem={{ name: '', score: '', exam: '', destination: '', university: '', image: '', testimonial: '' }}
          />
        </Field>
        <Field label="Bottom Stats">
          <ArrayEditor
            items={ss.stats || []}
            onChange={v => set('successStories', 'stats', v)}
            fields={[
              { key: 'value', label: 'Value (e.g. 7.0+)', isTitle: true },
              { key: 'label', label: 'Label' },
            ]}
            newItem={{ value: '', label: '' }}
          />
        </Field>
      </SectionCard>
    </>
  );
}

function CoursesEditor({ content, onChange }) {
  const set = (key, val) => onChange({ ...content, [key]: val });
  const hero = content.hero || {};
  const whyUs = content.whyUs || {};

  return (
    <>
      <SectionCard title="Page Hero">
        <Field label="Badge"><TextInput value={hero.badge} onChange={v => set('hero', { ...hero, badge: v })} /></Field>
        <Field label="Heading"><TextInput value={hero.heading} onChange={v => set('hero', { ...hero, heading: v })} /></Field>
        <Field label="Heading Highlight (red)"><TextInput value={hero.headingHighlight} onChange={v => set('hero', { ...hero, headingHighlight: v })} /></Field>
        <Field label="Description"><TextArea value={hero.description} onChange={v => set('hero', { ...hero, description: v })} /></Field>
      </SectionCard>

      <SectionCard title="Why Us Section">
        <Field label="Eyebrow"><TextInput value={whyUs.eyebrow} onChange={v => set('whyUs', { ...whyUs, eyebrow: v })} /></Field>
        <Field label="Title"><TextInput value={whyUs.title} onChange={v => set('whyUs', { ...whyUs, title: v })} /></Field>
        <Field label="Cards">
          <ArrayEditor
            items={whyUs.items || []}
            onChange={v => set('whyUs', { ...whyUs, items: v })}
            fields={[
              { key: 'icon', label: 'Icon (emoji)', isTitle: true },
              { key: 'title', label: 'Title' },
              { key: 'desc', label: 'Description' },
            ]}
            newItem={{ icon: '📌', title: '', desc: '' }}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Course Listings">
        <ArrayEditor
          items={content.courses || []}
          onChange={v => set('courses', v)}
          fields={[
            { key: 'title', label: 'Title', isTitle: true },
            { key: 'subtitle', label: 'Subtitle (tag)' },
            { key: 'category', label: 'Category ID (ielts/pte/spoken_english)' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'price', label: 'Price (₹)', type: 'number' },
            { key: 'originalPrice', label: 'Original Price (₹)', type: 'number' },
            { key: 'duration', label: 'Duration' },
            { key: 'students', label: 'Students (e.g. 2L+)' },
            { key: 'rating', label: 'Rating', type: 'number' },
            { key: 'image', label: 'Hero Image URL' },
            { key: 'videoUrl', label: 'YouTube Embed URL' },
            { key: 'features', label: 'Features List', type: 'stringArray', hint: 'one per line' },
            { key: 'outcomes', label: 'Learning Outcomes', type: 'stringArray', hint: 'one per line' },
            { key: 'whoIsItFor', label: 'Who Is It For', type: 'stringArray', hint: 'one per line' },
            { key: 'curriculum', label: 'Curriculum (JSON)', type: 'json' },
          ]}
          newItem={{
            id: '',
            category: '',
            title: '',
            subtitle: '',
            description: '',
            color: 'red',
            image: '',
            price: 0,
            originalPrice: 0,
            duration: '',
            students: '',
            rating: 4.9,
            features: [],
            outcomes: [],
            whoIsItFor: [],
            videoUrl: '',
            curriculum: []
          }}
        />
      </SectionCard>
    </>
  );
}

function AboutEditor({ content, onChange }) {
  const set = (key, val) => onChange({ ...content, [key]: val });
  const hero = content.hero || {};
  const story = content.story || {};

  return (
    <>
      <SectionCard title="Page Hero">
        <Field label="Badge"><TextInput value={hero.badge} onChange={v => set('hero', { ...hero, badge: v })} /></Field>
        <Field label="Heading"><TextInput value={hero.heading} onChange={v => set('hero', { ...hero, heading: v })} /></Field>
        <Field label="Heading Highlight (red)"><TextInput value={hero.headingHighlight} onChange={v => set('hero', { ...hero, headingHighlight: v })} /></Field>
        <Field label="Description"><TextArea value={hero.description} onChange={v => set('hero', { ...hero, description: v })} rows={4} /></Field>
      </SectionCard>

      <SectionCard title="Stats">
        <ArrayEditor
          items={content.stats || []}
          onChange={v => set('stats', v)}
          fields={[
            { key: 'value', label: 'Number', type: 'number', isTitle: true },
            { key: 'suffix', label: 'Suffix' },
            { key: 'label', label: 'Label' },
          ]}
          newItem={{ value: 0, suffix: '+', label: '' }}
        />
      </SectionCard>

      <SectionCard title="Our Story">
        <Field label="Eyebrow"><TextInput value={story.eyebrow} onChange={v => set('story', { ...story, eyebrow: v })} /></Field>
        <Field label="Title"><TextInput value={story.title} onChange={v => set('story', { ...story, title: v })} /></Field>
        <Field label="Paragraphs" hint="one paragraph per item">
          <ArrayEditor
            items={(story.paragraphs || []).map(p => ({ text: p }))}
            onChange={v => set('story', { ...story, paragraphs: v.map(i => i.text) })}
            fields={[{ key: 'text', label: 'Paragraph', type: 'textarea', rows: 4, isTitle: true }]}
            newItem={{ text: '' }}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Values">
        <ArrayEditor
          items={content.values || []}
          onChange={v => set('values', v)}
          fields={[
            { key: 'title', label: 'Title', isTitle: true },
            { key: 'desc', label: 'Description', type: 'textarea' },
          ]}
          newItem={{ title: '', desc: '' }}
        />
      </SectionCard>

      <SectionCard title="Leadership Team">
        <ArrayEditor
          items={content.leadership || []}
          onChange={v => set('leadership', v)}
          fields={[
            { key: 'name', label: 'Name', isTitle: true },
            { key: 'role', label: 'Role/Title' },
            { key: 'bio', label: 'Bio' },
            { key: 'image', label: 'Photo URL' },
          ]}
          newItem={{ name: '', role: '', bio: '', image: '' }}
        />
      </SectionCard>

      <SectionCard title="Partners & Accreditations">
        <Field label="Partner Names" hint="one per line">
          <StringArrayInput
            value={content.partners || []}
            onChange={v => set('partners', v)}
          />
        </Field>
      </SectionCard>
    </>
  );
}

function ImmigrationEditor({ content, onChange }) {
  const set = (key, val) => onChange({ ...content, [key]: val });
  const hero = content.hero || {};

  return (
    <>
      <SectionCard title="Page Hero">
        <Field label="Badge"><TextInput value={hero.badge} onChange={v => set('hero', { ...hero, badge: v })} /></Field>
        <Field label="Heading"><TextInput value={hero.heading} onChange={v => set('hero', { ...hero, heading: v })} /></Field>
        <Field label="Heading Highlight (blue)"><TextInput value={hero.headingHighlight} onChange={v => set('hero', { ...hero, headingHighlight: v })} /></Field>
        <Field label="Description"><TextArea value={hero.description} onChange={v => set('hero', { ...hero, description: v })} /></Field>
      </SectionCard>

      <SectionCard title="Countries">
        <ArrayEditor
          items={content.countries || []}
          onChange={v => set('countries', v)}
          fields={[
            { key: 'name', label: 'Country Name', isTitle: true },
            { key: 'flag', label: 'Flag Emoji' },
            { key: 'id', label: 'ID (canada/australia/uk/usa)' },
            { key: 'image', label: 'Cover Image URL' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'pathways', label: 'Immigration Pathways (JSON)', type: 'json' },
            { key: 'stats', label: 'Stats (JSON)', type: 'json' },
          ]}
          newItem={{ id: '', name: '', flag: '🌍', image: '', description: '', pathways: [], stats: [] }}
        />
      </SectionCard>

      <SectionCard title="Services">
        <ArrayEditor
          items={content.services || []}
          onChange={v => set('services', v)}
          fields={[
            { key: 'title', label: 'Title', isTitle: true },
            { key: 'description', label: 'Description', type: 'textarea' },
          ]}
          newItem={{ title: '', description: '' }}
        />
      </SectionCard>

      <SectionCard title="Process Steps">
        <ArrayEditor
          items={content.process || []}
          onChange={v => set('process', v)}
          fields={[
            { key: 'step', label: 'Step Number (01, 02...)', isTitle: true },
            { key: 'title', label: 'Title' },
            { key: 'desc', label: 'Description' },
          ]}
          newItem={{ step: '', title: '', desc: '' }}
        />
      </SectionCard>
    </>
  );
}

function SuccessStoriesEditor({ content, onChange }) {
  const set = (key, val) => onChange({ ...content, [key]: val });
  const hero = content.hero || {};

  return (
    <>
      <SectionCard title="Page Hero">
        <Field label="Badge"><TextInput value={hero.badge} onChange={v => set('hero', { ...hero, badge: v })} /></Field>
        <Field label="Heading"><TextInput value={hero.heading} onChange={v => set('hero', { ...hero, heading: v })} /></Field>
        <Field label="Heading Highlight"><TextInput value={hero.headingHighlight} onChange={v => set('hero', { ...hero, headingHighlight: v })} /></Field>
        <Field label="Description"><TextArea value={hero.description} onChange={v => set('hero', { ...hero, description: v })} /></Field>
      </SectionCard>

      <SectionCard title="Hero Stats">
        <ArrayEditor
          items={content.stats || []}
          onChange={v => set('stats', v)}
          fields={[
            { key: 'value', label: 'Number', type: 'number', isTitle: true },
            { key: 'suffix', label: 'Suffix' },
            { key: 'label', label: 'Label' },
          ]}
          newItem={{ value: 0, suffix: '+', label: '' }}
        />
      </SectionCard>

      <SectionCard title="Stories">
        <ArrayEditor
          items={content.stories || []}
          onChange={v => set('stories', v)}
          fields={[
            { key: 'name', label: 'Student Name', isTitle: true },
            { key: 'exam', label: 'Exam Type (ielts/pte/visa)' },
            { key: 'score', label: 'Score/Result' },
            { key: 'destination', label: 'Destination Country' },
            { key: 'university', label: 'University/Program' },
            { key: 'year', label: 'Year', type: 'number' },
            { key: 'image', label: 'Photo URL' },
            { key: 'testimonial', label: 'Testimonial', type: 'textarea', rows: 4 },
          ]}
          newItem={{ name: '', exam: 'ielts', score: '', destination: '', university: '', year: 2024, image: '', testimonial: '' }}
        />
      </SectionCard>

      <SectionCard title="Score Highlights">
        <ArrayEditor
          items={content.scoreHighlights || []}
          onChange={v => set('scoreHighlights', v)}
          fields={[
            { key: 'title', label: 'Category Title (e.g. IELTS Achievers)', isTitle: true },
            { key: 'scores', label: 'Scores Data (JSON)', type: 'json' },
          ]}
          newItem={{ title: '', scores: [] }}
        />
      </SectionCard>
    </>
  );
}

function BlogEditor({ content, onChange }) {
  const set = (key, val) => onChange({ ...content, [key]: val });
  const hero = content.hero || {};

  return (
    <>
      <SectionCard title="Page Hero">
        <Field label="Badge"><TextInput value={hero.badge} onChange={v => set('hero', { ...hero, badge: v })} /></Field>
        <Field label="Heading"><TextInput value={hero.heading} onChange={v => set('hero', { ...hero, heading: v })} /></Field>
        <Field label="Heading Highlight (red)"><TextInput value={hero.headingHighlight} onChange={v => set('hero', { ...hero, headingHighlight: v })} /></Field>
        <Field label="Description"><TextArea value={hero.description} onChange={v => set('hero', { ...hero, description: v })} /></Field>
      </SectionCard>

      <SectionCard title="Blog Posts">
        <ArrayEditor
          items={content.posts || []}
          onChange={v => set('posts', v)}
          fields={[
            { key: 'title', label: 'Title', isTitle: true },
            { key: 'slug', label: 'URL Slug (no spaces, use hyphens)' },
            { key: 'author', label: 'Author Name' },
            { key: 'category', label: 'Category (ielts_tips/pte_strategies/immigration_news/study_abroad/general)' },
            { key: 'date', label: 'Date (YYYY-MM-DD)' },
            { key: 'readTime', label: 'Read Time (minutes)', type: 'number' },
            { key: 'image', label: 'Cover Image URL' },
            { key: 'excerpt', label: 'Excerpt / Summary', type: 'textarea', rows: 3 },
          ]}
          newItem={{ id: Date.now(), title: '', slug: '', author: '', category: 'general', date: new Date().toISOString().split('T')[0], readTime: 5, image: '', excerpt: '', featured: false }}
        />
      </SectionCard>
    </>
  );
}

function HowItWorksEditor({ content, onChange }) {
  const set = (key, val) => onChange({ ...content, [key]: val });
  const hero = content.hero || {};
  const guarantee = content.guarantee || {};

  return (
    <>
      <SectionCard title="Page Hero">
        <Field label="Badge"><TextInput value={hero.badge} onChange={v => set('hero', { ...hero, badge: v })} /></Field>
        <Field label="Heading"><TextInput value={hero.heading} onChange={v => set('hero', { ...hero, heading: v })} /></Field>
        <Field label="Heading Highlight (red)"><TextInput value={hero.headingHighlight} onChange={v => set('hero', { ...hero, headingHighlight: v })} /></Field>
        <Field label="Description"><TextArea value={hero.description} onChange={v => set('hero', { ...hero, description: v })} /></Field>
      </SectionCard>

      <SectionCard title="Main Steps">
        <ArrayEditor
          items={content.steps || []}
          onChange={v => set('steps', v)}
          fields={[
            { key: 'step', label: 'Step Number', isTitle: true },
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'details', label: 'Detail Points', type: 'stringArray', hint: 'one per line' },
          ]}
          newItem={{ step: '', title: '', description: '', details: [] }}
        />
      </SectionCard>

      <SectionCard title="Features Grid">
        <ArrayEditor
          items={content.features || []}
          onChange={v => set('features', v)}
          fields={[
            { key: 'title', label: 'Title', isTitle: true },
            { key: 'description', label: 'Description', type: 'textarea' },
          ]}
          newItem={{ title: '', description: '' }}
        />
      </SectionCard>

      <SectionCard title="Score Guarantee">
        <Field label="Badge"><TextInput value={guarantee.badge} onChange={v => set('guarantee', { ...guarantee, badge: v })} /></Field>
        <Field label="Title"><TextInput value={guarantee.title} onChange={v => set('guarantee', { ...guarantee, title: v })} /></Field>
        <Field label="Description"><TextArea value={guarantee.description} onChange={v => set('guarantee', { ...guarantee, description: v })} /></Field>
        <Field label="Conditions" hint="one per line">
          <StringArrayInput value={guarantee.conditions || []} onChange={v => set('guarantee', { ...guarantee, conditions: v })} />
        </Field>
        <Field label="Stat Cards">
          <ArrayEditor
            items={guarantee.stats || []}
            onChange={v => set('guarantee', { ...guarantee, stats: v })}
            fields={[
              { key: 'value', label: 'Value', isTitle: true },
              { key: 'label', label: 'Label' },
            ]}
            newItem={{ value: '', label: '' }}
          />
        </Field>
      </SectionCard>

      <SectionCard title="FAQs">
        <ArrayEditor
          items={content.faqs || []}
          onChange={v => set('faqs', v)}
          fields={[
            { key: 'q', label: 'Question', isTitle: true },
            { key: 'a', label: 'Answer', type: 'textarea', rows: 3 },
          ]}
          newItem={{ q: '', a: '' }}
        />
      </SectionCard>
    </>
  );
}

function ContactEditor({ content, onChange }) {
  const set = (key, val) => onChange({ ...content, [key]: val });
  const hero = content.hero || {};
  const wh = content.workingHours || {};

  return (
    <>
      <SectionCard title="Page Hero">
        <Field label="Badge"><TextInput value={hero.badge} onChange={v => set('hero', { ...hero, badge: v })} /></Field>
        <Field label="Heading"><TextInput value={hero.heading} onChange={v => set('hero', { ...hero, heading: v })} /></Field>
        <Field label="Heading Highlight (red)"><TextInput value={hero.headingHighlight} onChange={v => set('hero', { ...hero, headingHighlight: v })} /></Field>
        <Field label="Description"><TextArea value={hero.description} onChange={v => set('hero', { ...hero, description: v })} /></Field>
      </SectionCard>

      <SectionCard title="Contact Methods">
        <ArrayEditor
          items={content.contactMethods || []}
          onChange={v => set('contactMethods', v)}
          fields={[
            { key: 'title', label: 'Title (Call Us, Email Us...)', isTitle: true },
            { key: 'details', label: 'Details (2 lines)', type: 'stringArray', hint: 'one per line' },
            { key: 'actionText', label: 'Button Text' },
            { key: 'actionHref', label: 'Button Link (tel:, mailto:, https:)' },
          ]}
          newItem={{ title: '', details: ['', ''], actionText: '', actionHref: '' }}
        />
      </SectionCard>

      <SectionCard title="Office Locations">
        <ArrayEditor
          items={content.offices || []}
          onChange={v => set('offices', v)}
          fields={[
            { key: 'city', label: 'City', isTitle: true },
            { key: 'address', label: 'Address' },
            { key: 'phone', label: 'Phone' },
          ]}
          newItem={{ city: '', address: '', phone: '' }}
        />
      </SectionCard>

      <SectionCard title="Working Hours">
        <Field label="Weekdays Label"><TextInput value={wh.weekdays} onChange={v => set('workingHours', { ...wh, weekdays: v })} /></Field>
        <Field label="Weekdays Time"><TextInput value={wh.weekdaysTime} onChange={v => set('workingHours', { ...wh, weekdaysTime: v })} /></Field>
        <Field label="Online Label"><TextInput value={wh.online} onChange={v => set('workingHours', { ...wh, online: v })} /></Field>
        <Field label="Online Time"><TextInput value={wh.onlineTime} onChange={v => set('workingHours', { ...wh, onlineTime: v })} /></Field>
      </SectionCard>
    </>
  );
}

function GlobalEditor({ content, onChange }) {
  const set = (key, val) => onChange({ ...content, [key]: val });
  const footer = content.footer || {};
  const cta = content.cta || {};

  return (
    <>
      <SectionCard title="Header Navigation">
        <Field label="Menu Items" hint="use page name for href (e.g. Home, About, Courses?category=ielts)">
          <ArrayEditor
            items={content.navLinks || []}
            onChange={v => set('navLinks', v)}
            fields={[
              { key: 'label', label: 'Label', isTitle: true },
              { key: 'href', label: 'Href (page name)' },
              { key: 'dropdown', label: 'Dropdown Items (JSON)', type: 'json', hint: 'leave empty or []' },
            ]}
            newItem={{ label: '', href: '', dropdown: [] }}
          />
        </Field>
        <p className="text-xs text-slate-400 mt-1">Dropdown format: <code className="bg-slate-100 px-1 rounded">[{`{"label":"IELTS","href":"Courses?category=ielts"}`}]</code> — leave as <code className="bg-slate-100 px-1 rounded">[]</code> for no dropdown.</p>
      </SectionCard>

      <SectionCard title="Footer — Brand & Contact">
        <Field label="Brand Description"><TextArea value={footer.description} onChange={v => set('footer', { ...footer, description: v })} /></Field>
        <Field label="Address"><TextArea value={footer.address} onChange={v => set('footer', { ...footer, address: v })} rows={2} /></Field>
        <Field label="Phone"><TextInput value={footer.phone} onChange={v => set('footer', { ...footer, phone: v })} /></Field>
        <Field label="Email"><TextInput value={footer.email} onChange={v => set('footer', { ...footer, email: v })} /></Field>
      </SectionCard>

      <SectionCard title="Footer — Social Links">
        <ArrayEditor
          items={footer.socialLinks || []}
          onChange={v => set('footer', { ...footer, socialLinks: v })}
          fields={[
            { key: 'platform', label: 'Platform (Facebook, Instagram...)', isTitle: true },
            { key: 'href', label: 'URL' },
          ]}
          newItem={{ platform: '', href: '#', active: true }}
        />
      </SectionCard>

      <SectionCard title="Footer — Study Destinations">
        <Field label="Countries" hint="one per line">
          <StringArrayInput
            value={footer.destinations || []}
            onChange={v => set('footer', { ...footer, destinations: v })}
          />
        </Field>
      </SectionCard>

      <SectionCard title="CTA Section (used on all pages)">
        <Field label="Badge"><TextInput value={cta.badge} onChange={v => set('cta', { ...cta, badge: v })} /></Field>
        <Field label="Heading"><TextInput value={cta.heading} onChange={v => set('cta', { ...cta, heading: v })} /></Field>
        <Field label="Heading Highlight (red)"><TextInput value={cta.headingHighlight} onChange={v => set('cta', { ...cta, headingHighlight: v })} /></Field>
        <Field label="Description"><TextArea value={cta.description} onChange={v => set('cta', { ...cta, description: v })} /></Field>
        <Field label="Primary Button Text"><TextInput value={cta.primaryBtn} onChange={v => set('cta', { ...cta, primaryBtn: v })} /></Field>
        <Field label="Call Phone (with country code, no spaces)"><TextInput value={cta.callPhone} onChange={v => set('cta', { ...cta, callPhone: v })} placeholder="+919988892587" /></Field>
        <Field label="Call Button Text"><TextInput value={cta.callLabel} onChange={v => set('cta', { ...cta, callLabel: v })} /></Field>
        <Field label="Trust Signal Text"><TextInput value={cta.trustSignal} onChange={v => set('cta', { ...cta, trustSignal: v })} /></Field>
        <Field label="Feature Cards">
          <ArrayEditor
            items={cta.cards || []}
            onChange={v => set('cta', { ...cta, cards: v })}
            fields={[
              { key: 'icon', label: 'Emoji Icon', isTitle: true },
              { key: 'title', label: 'Title' },
              { key: 'desc', label: 'Description' },
            ]}
            newItem={{ icon: '📌', title: '', desc: '' }}
          />
        </Field>
      </SectionCard>
    </>
  );
}

// ─── Page map ────────────────────────────────────────────────────────────────

const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'courses', label: 'Courses' },
  { id: 'about', label: 'About' },
  { id: 'immigration', label: 'Immigration' },
  { id: 'successstories', label: 'Success Stories' },
  { id: 'blog', label: 'Blog' },
  { id: 'howitworks', label: 'How It Works' },
  { id: 'contact', label: 'Contact' },
  { id: 'global', label: 'Global (Footer & CTA)' },
];

const EDITORS = {
  home: HomeEditor,
  courses: CoursesEditor,
  about: AboutEditor,
  immigration: ImmigrationEditor,
  successstories: SuccessStoriesEditor,
  blog: BlogEditor,
  howitworks: HowItWorksEditor,
  contact: ContactEditor,
  global: GlobalEditor,
};

// ─── Main admin dashboard ────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [content, setContent] = useState({});
  const [loadingContent, setLoadingContent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' | 'error' | null
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Auth check
  useEffect(() => {
    fetch('/api/admin/verify')
      .then(r => r.json())
      .then(d => {
        if (!d.authenticated) router.replace('/admin/login');
        else setAuthChecked(true);
      })
      .catch(() => router.replace('/admin/login'));
  }, [router]);

  // Load content when page changes
  const loadContent = useCallback(async (page) => {
    setLoadingContent(true);
    setSaveStatus(null);
    try {
      const res = await fetch(`/api/admin/content/${page}`);
      const data = await res.json();
      setContent(data);
    } catch {
      setContent({});
    } finally {
      setLoadingContent(false);
    }
  }, []);

  useEffect(() => {
    if (authChecked) loadContent(activePage);
  }, [activePage, authChecked, loadContent]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch(`/api/admin/content/${activePage}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-slate-500 text-sm flex items-center gap-2">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Verifying access...
        </div>
      </div>
    );
  }

  const ActiveEditor = EDITORS[activePage];

  return (
    <>
      <Head>
        <title>Admin Dashboard — Grey Matters</title>
      </Head>
      <div className="min-h-screen bg-slate-100 flex flex-col">

        {/* Top bar */}
        <header className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img src="/logo.png" alt="Grey Matters" className="h-8 w-auto" />
            <div>
              <div className="font-bold text-sm leading-tight">Grey Matters</div>
              <div className="text-red-400 text-xs">Admin Panel</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block"
            >
              View Site ↗
            </a>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-medium bg-slate-700 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-56 flex-shrink-0 bg-white border-r border-slate-200 overflow-y-auto`}>
            <div className="p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Pages</p>
              <nav className="space-y-1">
                {PAGES.map(page => (
                  <button
                    key={page.id}
                    onClick={() => { setActivePage(page.id); setSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      activePage === page.id
                        ? 'bg-red-50 text-red-600 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {page.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            {/* Content header */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
              <div>
                <h1 className="font-bold text-slate-900">
                  {PAGES.find(p => p.id === activePage)?.label} Content
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">Edit and save changes to update the live site</p>
              </div>
              <div className="flex items-center gap-3">
                {saveStatus === 'saved' && (
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved!
                  </span>
                )}
                {saveStatus === 'error' && (
                  <span className="text-red-500 text-sm font-medium">Save failed</span>
                )}
                <button
                  onClick={() => loadContent(activePage)}
                  disabled={loadingContent}
                  className="px-4 py-2 text-sm font-medium border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || loadingContent}
                  className="px-5 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Editor area */}
            <div className="p-6 max-w-4xl">
              {loadingContent ? (
                <div className="flex items-center justify-center py-24 text-slate-400 gap-2">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading content...
                </div>
              ) : ActiveEditor ? (
                <ActiveEditor content={content} onChange={setContent} />
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
