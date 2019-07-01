declare namespace BMap {
    //核心类
    class Map {
        constructor(container: string | HTMLElement, opts: MapOptions);

        enableDragging(): void;
        disableDragging(): void;
        enableScrollWheelZoom(): void;
        disableScrollWheelZoom(): void;
        enableDoubleClickZoom(): void;
        disableDoubleClickZoom(): void;
        enableKeyboard(): void;
        disableKeyboard(): void;
        enableInertialDragging(): void;
        disableInertialDragging(): void;
        enableContinuousZoom(): void;
        disableContinuousZoom(): void;
        enablePinchToZoom(): void;
        disablePinchToZoom(): void;
        enableAutoResize(): void;
        disableAutoResize(): void;
        setDefaultCursor(cursor: string): void;
        getDefaultCursor(): void;
    }
    interface MapOptions {
        minZoom?: number,
        maxZoom?: number,
        mapType?: MapType,
        enableHighResolution?: boolean,
        enableAutoResize?: boolean,
        enableMapClick?: boolean
    } // Done ?
    interface PanOptions {
        noAnimation?: boolean
    } // Done ?

    interface Viewport {
        center: Point,
        zoom: number
    } // Done
    interface ViewportOptions {
        enableAnimation?: boolean,
        margins?: Array<number>,
        zoomFactor?: number,
        delay?: number
    }// Done ?

    class APIVersion {
        static BMAP_API_VERSION: string;
    } // Done

    interface MapStyle {
        features: Array<any>,
        style: string
    } // Done
    interface MapStyleV2 {
        styleJson: Array<any>
    } // Done


    //基础类
    class Point {
        constructor(lng: number, lat: number);

        lng: number;
        lat: number;

        equals(other: Point): boolean;
    } // Done
    class Pixel {
        constructor(x: number, y: number);

        x: number;
        y: number;

        equals(other: Pixel): boolean;
    } // Done
    class Bounds {
        constructor(sw: Point, ne: Point);

        equals(other: Bounds): boolean;
        containsPoint(point: Point): boolean;
        containsBounds(bounds: Bounds): boolean;
        intersects(other: Bounds): Bounds;
        extend(point: Point): void;
        getCenter(): Point;
        isEmpty(): boolean;
        getSouthWest(): Point;
        getNorthEast(): Point;
        toSpan(): Point;
    } // Done
    class Size {
        constructor(width: number, height: number);

        width: number;
        height: number;

        equals(other: Size): boolean;
    } // Done

    //控件类
    class Control {
        constructor();

        defaultAnchor: ControlAnchor;
        defaultOffset: Size;

        setAnchor(anchor: ControlAnchor): void;
        getAnchor(): ControlAnchor;
        setOffset(offset: Size): void;
        getOffset(): Size;
        show(): void;
        hide(): void;
        isVisible(): boolean;

    } // Done ?
    enum ControlAnchor {
        BMAP_ANCHOR_TOP_LEFT,
        BMAP_ANCHOR_TOP_RIGHT,
        BMAP_ANCHOR_BOTTOM_LEFT,
        BMAP_ANCHOR_BOTTOM_RIGHT
    } // Done ?

    class NavigationControl extends Control {
        constructor(type: NavigationControlOptions);

        getType(): NavigationControlType
        setType(type: NavigationControlType): void;
    } // Done
    interface NavigationControlOptions {
        anchor?: ControlAnchor,
        offset?: Size,
        type?: NavigationControlType,
        showZoomInfo?: boolean,
        enableGeolocation?: boolean,
    } // Done ?
    enum NavigationControlType {
        BMAP_NAVIGATION_CONTROL_LARGE,
        BMAP_NAVIGATION_CONTROL_SMALL,
        BMAP_NAVIGATION_CONTROL_PAN,
        BMAP_NAVIGATION_CONTROL_ZOOM
    } // Done ?

    class GeolocationControl extends Control {
        constructor(type: GeolocationControlOptions);

        location(): void;

        getAddressComponent(): AddressComponent | null;

        locationSuccess(point: Point, addressComponent: AddressComponent): void;
        locationError(statusCode: StatusCode): void;
    } // Done ?
    interface GeolocationControlOptions {
        anchor?: ControlAnchor,
        offset?: Size,
        showAddressBar?: boolean,
        enableAutoLocation?: boolean,
        locationIcon?: Icon
    } // Done

    class OverviewMapControl extends Control {
        constructor(opts: OverviewMapControlOptions);

        changeView(): void;
        setSize(size: Size): void;
        getSize(): Size;

        viewChanged(event: {type: any, target: any, isOpen: boolean}): void;
        viewChanging(event: {type: any, target: any}): void;
    } // Done ?
    interface OverviewMapControlOptions {
        anchor?: ControlAnchor,
        offset?: Size,
        size?: Size,
        isOpen?: boolean,
    } // Done ?

    class ScaleControl extends Control {
        constructor(opts: ScaleControlOptions);

        getUnit(): LengthUnit;
        setUnit(unit: LengthUnit): void;
    } // Done
    interface ScaleControlOptions {
        anchor?: ControlAnchor,
        offset?: Size
    } // Done ?

    enum LengthUnit {
        BMAP_UNIT_METRIC,
        BMAP_UNIT_IMPERIAL
    } // Done

    class CopyrightControl extends Control {
        constructor(opts: CopyrightControlOptions);

        addCopyright(copyright: Copyright): void;
        removeCopyright(id: number): void;
        getCopyright(id: number): Copyright;
        getCopyrightCollection(): Array<Copyright>;
    } // Done
    interface CopyrightControlOptions {
        anchor?: ControlAnchor,
        offset?: Size
    } // Done ?
    interface Copyright {
        id: number,
        content: string,
        bounds: Bounds
    } // Done

    class MapTypeControl extends Control {
        constructor(opts: MapTypeControlOptions);
    } // Done
    interface MapTypeControlOptions {
        type?: MapTypeControlType,
        mapTypes?: Array<MapType>
    } // Done
    enum MapTypeControlType {
        BMAP_MAPTYPE_CONTROL_HORIZONTAL,
        BMAP_MAPTYPE_CONTROL_DROPDOWN,
        BMAP_MAPTYPE_CONTROL_MAP
    } // Done

    class PanoramaControl extends Control {
        constructor();
    } // Done

    enum StatusCode {
        BMAP_STATUS_PERMISSION_DENIED,
        BMAP_STATUS_SERVICE_UNAVAILABLE,
        BMAP_STATUS_TIMEOUT
    }// Done

    //覆盖物类
    abstract class Overlay {
        abstract initialize(map: Map): HTMLElement;
        isVisible(): boolean;
        abstract draw(): void;
        show(): void;
        hide(): void;
    } // Done

    interface MapPanes {
        floatPane?: HTMLElement,
        markerMouseTarget?: HTMLElement,
        floatShadow?: HTMLElement,
        labelPane?: HTMLElement,
        markerPane?: HTMLElement,
        markerShadow?: HTMLElement,
        mapPane?: HTMLElement
    } // Done

    class Marker extends Overlay{
        constructor(point: Point, opts: MarkerOptions);

        initialize(map: Map): HTMLElement;
        draw(): void;
        openInfoWindow(infoWnd: InfoWindow): void;
        closeInfoWindow(): void;
        setIcon(icon: Icon): void;
        getIcon(): Icon;
        setPosition(position: Point): void;
        getPosition(): Point;
        setOffset(offset: Size): void;
        getOffset(): Size;
        setLabel(label: Label): void;
        getLabel(): Label;
        setTitle(title: string): void;
        getTitle(): string;
        setTop(isTop: boolean): void;
        enableDragging(): void;
        disableDragging(): void;
        enableMassClear(): void;
        disableMassClear(): void;
        setZIndex(zIndex: number): void;
        getMap(): Map;
        addContextMenu(menu: ContextMenu): void;
        removeContextMenu(menu: ContextMenu): void;
        setAnimation(animation: Animation | null): void;
        setRotation(rotation: number): void;
        getRotation(): number;
        setShadow(shadow: Icon): void;
        getShadow(): Icon;
        addEventListener(event: string, handler: Function): void;
        removeEventListener(event: string, handler: Function): void;
    }// Done ?
    interface MarkerOptions {
        offset?: Size,
        icon?: Icon,
        enableMassClear?: boolean,
        enableDragging?: boolean,
        enableClicking?: boolean,
        raiseOnDrag?: boolean,
        draggingCursor?: string,
        rotation?: number,
        shadow?: Icon,
        title?: string
    }

    enum Animation {
        BMAP_ANIMATION_DROP,
        BMAP_ANIMATION_BOUNCE
    } // Done ?

    class Icon extends Overlay {
        constructor(url: String, size: Size, opts: IconOptions);

        anchor: Size;
        size: Size;
        imageOffset: Size;
        imageSize: Size;
        imageUrl: string;
        infoWindowAnchor: Size;
        printImageUrl: string;

        initialize(map: Map): HTMLElement;
        draw(): void;
        setImageUrl(imageUrl: string): void;
        setSize(size: Size): void;
        setImageSize(offset: Size): void;
        setAnchor(anchor: Size): void;
        setImageOffset(offset: Size): void;
        setInfoWindowAnchor(anchor: Size): void;
        setPrintImageUrl(url: string): void;
    } // Done ?
    interface IconOptions {
        anchor?: Size;
        imageOffset?: Size;
        infoWindowAnchor?: Size;
        printImageUrl?: string;
    } // Done

    class InfoWindow extends Overlay {
        constructor(content: String | HTMLElement, opts: InfoWindowOptions);

        initialize(map: Map): HTMLElement;
        draw(): void;
        setWidth(width: Number): void;
        setHeight(height: Number): void;
        redraw(): void;
        setTitle(title: String | HTMLElement): void;
        getTitle(): String | HTMLElement;
        setContent(content: String | HTMLElement): void;
        getContent(): String | HTMLElement;
        getPosition(): Point;
        enableMaximize(): void;
        disableMaximize(): void;
        isOpen(): boolean;
        setMaxContent(content: string): void;
        maximize(): void;
        restore(): void;
        enableAutoPan(): void;
        disableAutoPan(): void;
        enableCloseOnClick(): void;
        disableCloseOnClick(): void;
        addEventListener(event: string, handler: Function): void;
        removeEventListener(event: string, handler: Function): void
    } // Done
    interface InfoWindowOptions {
        width?: number,
        height?: number,
        maxWidth?: number,
        offset: Size,
        title: string,
        enableAutoPan: boolean,
        enableCloseOnClick: boolean,
        enableMessage: boolean,
        message: string
    } // Done

    class Label extends Overlay {
        constructor(content: string, opts: LabelOptions)

        initialize(map: Map): HTMLElement;
        draw(): void;
        setStyle(styles: Object): void;
        setContent(content: string): void;
        setPosition(position: Point): void;
        getPosition(): Point;
        setOffset(offset: Size): void;
        getOffset(): Size;
        setTitle(title: string): void;
        getTitle(): string;
        enableMassClear(): void;
        disableMassClear(): void;
        setZIndex(zIndex: number): void;
        setPosition(position: Point): void;
        getMap(): Map;
        addEventListener(event: string, handler: Function): void;
        removeEventListener(event: string, handler: Function): void
    } // Done
    interface LabelOptions {
        offset?: Size,
        position?: Point,
        enableMassClear?: boolean
    } // Done



    //地图类型类
    class MapType {
        constructor(name: string, layers: TileLayer | Array<TileLayer>, options: MapTypeOptions);

        getName(): string;
        getTileLayer(): TileLayer;
        getMinZoom(): number;
        getMaxZoom(): number;
        getProjection(): Projection;
        getTextColor(): string;
        getTips(): string;

        static BMAP_NORMAL_MAP: MapType;
        static BMAP_SATELLITE_MAP: MapType;
        static BMAP_HYBRID_MAP: MapType;
    } // Done ?
    interface MapTypeOptions {
        minZoom?: number
        maxZoom?: number
        errorImageUrl?: string
        textColor?: number
        tips?: string
    } // Done

    abstract class Projection {
        abstract lngLatToPoint(lngLat: Point): Pixel;
        abstract pointToLngLat(point: Pixel): Point;
    } // Done
    class MercatorProjection extends Projection {
        lngLatToPoint(lngLat: Point): Pixel;
        pointToLngLat(point: Pixel): Point;
    } // Done
    class PerspectiveProjection extends Projection {
        lngLatToPoint(lngLat: Point): Pixel;
        pointToLngLat(point: Pixel): Point;
    } // Done

    //地图图层类
    class TileLayer {}

    //右键菜单类
    class ContextMenu {}

    //服务类
    class AddressComponent {}
}
