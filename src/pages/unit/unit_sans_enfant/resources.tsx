"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/types/unit";
import { resourcesData, Resource } from "@/examples/resourcesData";
import { FileText, Video, Music, Image, Link, Folder, Download, Plus, Search, Filter } from "lucide-react";

interface UnitResourcesProps {
  unit: Unit;
}

export default function UnitResources({ unit }: UnitResourcesProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    const unitResources = resourcesData[unit.id] || [];
    setResources(unitResources);
    setFilteredResources(unitResources);
  }, [unit.id]);

  useEffect(() => {
    let filtered = resources;

    // Filtrer par type
    if (filterType !== "all") {
      filtered = filtered.filter(resource => resource.type === filterType);
    }

    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, filterType]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document": return <FileText size={20} className="text-blue-500" />;
      case "video": return <Video size={20} className="text-red-500" />;
      case "audio": return <Music size={20} className="text-green-500" />;
      case "image": return <Image size={20} className="text-purple-500" />;
      case "link": return <Link size={20} className="text-orange-500" />;
      case "folder": return <Folder size={20} className="text-yellow-500" />;
      default: return <FileText size={20} className="text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "document": return "Document";
      case "video": return "Vidéo";
      case "audio": return "Audio";
      case "image": return "Image";
      case "link": return "Lien";
      case "folder": return "Dossier";
      default: return type;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const resourceTypes = ["all", "document", "video", "audio", "image", "link", "folder"];

  const totalSize = resources.reduce((sum, resource) => sum + (resource.size || 0), 0);
  const totalDownloads = resources.reduce((sum, resource) => sum + (resource.downloadCount || 0), 0);

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a61] mb-2">Ressources - {unit.name}</h1>
            <p className="text-gray-600">
              {resources.length > 0 
                ? `${resources.length} ressource(s) disponible(s)`
                : "Aucune ressource disponible"
              }
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors">
            <Plus size={16} />
            <span>Ajouter Ressource</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      {resources.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{resources.length}</p>
            <p className="text-sm opacity-90">Total ressources</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{formatFileSize(totalSize)}</p>
            <p className="text-sm opacity-90">Taille totale</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{totalDownloads}</p>
            <p className="text-sm opacity-90">Téléchargements</p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold">{new Set(resources.map(r => r.type)).size}</p>
            <p className="text-sm opacity-90">Types différents</p>
          </div>
        </div>
      )}

      {/* Filtres et recherche */}
      {resources.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, description ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0d5a61]"
              />
            </div>
            
            {/* Filtre par type */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0d5a61]"
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type}>
                    {type === "all" ? "Tous les types" : getTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Liste des ressources */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getResourceIcon(resource.type)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{resource.name}</h3>
                    <p className="text-sm text-gray-500">{getTypeLabel(resource.type)}</p>
                  </div>
                </div>
                {resource.type !== "folder" && (
                  <button className="p-1 text-gray-400 hover:text-[#0d5a61] transition-colors">
                    <Download size={16} />
                  </button>
                )}
              </div>

              {resource.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {resource.description}
                </p>
              )}

              {/* Tags */}
              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{resource.tags.length - 3}</span>
                  )}
                </div>
              )}

              {/* Informations supplémentaires */}
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Ajouté par:</span>
                  <span className="font-medium">{resource.uploadedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date(resource.uploadedAt).toLocaleDateString('fr-FR')}</span>
                </div>
                {resource.size && (
                  <div className="flex justify-between">
                    <span>Taille:</span>
                    <span>{formatFileSize(resource.size)}</span>
                  </div>
                )}
                {resource.downloadCount !== undefined && (
                  <div className="flex justify-between">
                    <span>Téléchargements:</span>
                    <span>{resource.downloadCount}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                {resource.type === "link" ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-[#0d5a61] text-white text-sm rounded-lg hover:bg-[#0a4a50] transition-colors"
                  >
                    <Link size={14} />
                    <span>Ouvrir le lien</span>
                  </a>
                ) : (
                  <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-[#0d5a61] text-white text-sm rounded-lg hover:bg-[#0a4a50] transition-colors">
                    <Download size={14} />
                    <span>Télécharger</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : resources.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat</h3>
          <p className="text-gray-500">
            Aucune ressource ne correspond à vos critères de recherche.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-[#d9f0f2] p-12 text-center">
          <div className="text-gray-400 mb-4">
            <FileText size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune ressource</h3>
          <p className="text-gray-500 mb-6">
            Aucune ressource n'a encore été ajoutée à cette unité.
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0d5a61] text-white rounded-lg hover:bg-[#0a4a50] transition-colors mx-auto">
            <Plus size={16} />
            <span>Ajouter la première ressource</span>
          </button>
        </div>
      )}
    </div>
  );
}
